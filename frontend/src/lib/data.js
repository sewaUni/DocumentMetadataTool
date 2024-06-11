import pb from "@/lib/pocketbase";
import { revalidatePath } from "next/cache";
import { console } from "next/dist/compiled/@edge-runtime/primitives";

const PAPERS_PER_PAGE = 10;

export async function fetchAllPapers() {
  return await pb.collection("papers").getFullList({
    sort: "-created",
    cache: "no-store",
  });
}

export async function fetchFilteredPapers(query, currentPage) {
  const response = await pb
    .collection("papers")
    .getList(currentPage, PAPERS_PER_PAGE, {
      sort: "-created",
      cache: "no-store",
      filter: 'title ~ "%' + query + '%"',
    });

  return response.items;
}

export async function fetchPapersByPerson(personId) {
  return await pb.collection("papers").getFullList({
    sort: "-created",
    cache: "no-store",
    filter:
      'authors ?~ "%' + personId + '%" || supervisors ?~ "%' + personId + '%"',
  });
}

export async function fetchPapersByLiterature(literatureId) {
  return await pb.collection("papers").getFullList({
    sort: "-created",
    cache: "no-store",
    filter: 'literature ?~ "%' + literatureId + '%"',
  });
}

export async function fetchPaper(id) {
  return await pb.collection("papers").getOne(id, { cache: "no-store" });
}

export async function fetchPerson(id) {
  return await pb.collection("person").getOne(id, { cache: "no-store" });
}

export async function fetchLiterature(id) {
  return await pb.collection("literature").getOne(id, { cache: "no-store" });
}

export async function fetchAuthorNames(authorIds) {
  const authorNames = [];

  await Promise.all(
    authorIds.map(async (author) => {
      const authorData = await pb.collection("person").getOne(author);
      authorNames.push(authorData.name);
    }),
  );

  return authorNames.join(", ");
}

export async function fetchPersons(personIds) {
  const persons = [];

  await Promise.all(
    personIds.map(async (a) => {
      const personData = await pb.collection("person").getOne(a);
      persons.push({
        id: personData.id,
        name: personData.name,
      });
    }),
  );

  persons.sort((a, b) => a.name.localeCompare(b.name));
  return persons;
}

export async function fetchAllPersons() {
  return await pb.collection("person").getFullList({
    sort: "name",
    cache: "no-store",
  });
}

export async function fetchUsedLiterature(literatureIds) {
  const literature = [];

  await Promise.all(
    literatureIds.map(async (l) => {
      const literatureData = await pb.collection("literature").getOne(l);
      literature.push(literatureData);
    }),
  );

  literature.sort((a, b) => a.title.localeCompare(b.title));
  return literature;
}

export async function fetchAllLiterature() {
  return await pb.collection("literature").getFullList({
    sort: "title",
    cache: "no-store",
  });
}

export async function fetchPaperPages() {
  const papers = await fetchAllPapers(); //todo inefficient to fetch all papers
  return Math.ceil(papers.length / PAPERS_PER_PAGE);
}

export async function updatePaper(paper) {
  try {
    const result = await pb.collection("papers").update(paper.id, paper);

    revalidatePath("/papers/" + paper.id);
    return result;
  } catch (error) {
    console.error(error);
    return {
      error: error.message,
    };
  }
}

export async function updatePaperById(paperId, paper) {
  try {
    const result = await pb.collection("papers").update(paperId, paper);

    revalidatePath("/papers/" + paperId);
    return result;
  } catch (error) {
    console.error(error);
    return {
      error: error.message,
    };
  }
}

export async function updatePerson(person) {
  try {
    const result = await pb.collection("person").update(person.id, person);

    revalidatePath("/authors/" + person.id);
    return result;
  } catch (error) {
    console.error(error);
    return {
      error: error.message,
    };
  }
}

export async function createPerson(json) {
  try {
    const result = await pb.collection("person").create(json);

    console.log(result);
    return result;
  } catch (error) {
    console.error(error);
    return {
      error: error.message,
    };
  }
}

export async function updateLiterature(literature) {
  try {
    const result = await pb
      .collection("literature")
      .update(literature.id, literature);

    revalidatePath("/literature/" + literature.id);
    return result;
  } catch (error) {
    console.error(error);
    return {
      error: error.message,
    };
  }
}

export async function createLiterature(json) {
  try {
    const result = await pb.collection("literature").create(json);

    console.log(result);
    return result;
  } catch (error) {
    console.error(error);
    return {
      error: error.message,
    };
  }
}

export async function uploadPaper(file) {
  try {
    const result = await pb.collection("papers").create(file);
    const formData = new FormData();
    formData.append("id", result.id);
    const response = await fetch("http://127.0.0.1:8000/api/upload-paper", {
       method: "POST",
       body: formData,
    });
    if (response?.ok) {
      revalidatePath("/papers/" + result.id);
      return result;
    } else {
      console.log(`Backend Response Code: ${response?.status}`);
      console.log(`Backend Response Text: ${response?.statusText}`);
      throw new Error(response?.status.toString());
    }
  } catch (error) {
    console.error(error);
    return {
      error: error.message,
    };
  }
}

export async function deletePaper(paperId) {
  try {
    const result = await pb.collection("papers").delete(paperId);

    revalidatePath("/papers");
    return result;
  } catch (error) {
    console.error(error);
    return {
      error: error.message,
    };
  }
}

export async function fetchPaperFile(paperId, fileName) {
  console.log(paperId, fileName);
  const record = await pb.collection("papers").getOne(paperId);

  const url = pb.files.getUrl(paperId, fileName);
  console.log(url);
}

export async function fetchCardData() {
  const numberOfPapers = (await pb.collection("papers").getFullList()).length;
  const numberOfAuthors = (await pb.collection("person").getFullList()).length;
  const numberOfLiterature = (await pb.collection("literature").getFullList())
    .length;

  //calculate average pages
  const papers = await fetchAllPapers();
  const totalPages = papers.reduce((acc, paper) => acc + paper.pages, 0);
  const averagePages = parseFloat((totalPages / numberOfPapers).toFixed(2));

  return {
    numberOfPapers,
    numberOfAuthors,
    numberOfLiterature,
    averagePages,
  };
}

export async function fetchSupervisorStatistics() {
  const supervisors = await pb.collection("person").getFullList({
    cache: "no-store",
    filter: 'person_type="Supervisor"',
  });
  const statistics = [];

  await Promise.all(
    supervisors.map(async (supervisor) => {
      const papers = await fetchPapersByPerson(supervisor.id);
      statistics.push({
        id: supervisor.id,
        name: supervisor.name,
        email: supervisor.email,
        papers: papers.length,
      });
    }),
  );

  statistics.sort((a, b) => b.papers - a.papers);
  return statistics;
}

export async function fetchMethodologyStatistics() {
  const papers = await fetchAllPapers();
  const methodCounts = papers.reduce((acc, paper) => {
    if (acc[paper.methodology]) {
      // Increment the count if it exists
      acc[paper.methodology]++;
    } else {
      // Initialize the count if it does not exist
      acc[paper.methodology] = 1;
    }
    return acc;
  }, {});

  const statistics = Object.keys(methodCounts).map((method) => {
    return {
      name: method === "" ? "N/A" : method,
      count: methodCounts[method],
    };
  });

  statistics.sort((a, b) => b.count - a.count);
  return statistics;
}

export async function fetchPageStatisticsPerCourse() {
  const papers = await fetchAllPapers();
  const courseData = papers.reduce((acc, paper) => {
    const course = paper.course;
    if (acc[course]) {
      acc[course].totalPages += paper.pages;
      acc[course].count++;
    } else {
      acc[course] = { totalPages: paper.pages, count: 1 };
    }
    return acc;
  }, {});

  const statistics = Object.keys(courseData).map((method) => {
    const { totalPages, count } = courseData[method];
    const averagePages = parseFloat((totalPages / count).toFixed(2));
    return { name: method === "" ? "N/A" : method, averagePages: averagePages };
  });

  statistics.sort((a, b) => b.averagePages - a.averagePages);
  return statistics;
}

export async function fetchPapersPerYearStatistics() {
  const papers = await fetchAllPapers();
  const yearCounts = papers.reduce((acc, paper) => {
    const year = new Date(paper.date).getFullYear();
    if (acc[year]) {
      // Increment the count if it exists
      acc[year]++;
    } else {
      // Initialize the count if it does not exist
      acc[year] = 1;
    }
    return acc;
  }, {});

  const statistics = Object.keys(yearCounts)
    .map((year) => {
      return {
        year: year,
        count: yearCounts[year],
      };
    })
    .filter((stat) => stat.year !== "NaN");

  statistics.sort((a, b) => a.year - b.year);

  const years = statistics.map((item) => parseInt(item.year));
  const minYear = Math.min(...years);
  const maxYear = Math.max(...years);

  const completeData = [];
  for (let year = minYear; year <= maxYear; year++) {
    const existingItem = statistics.find(
      (item) => parseInt(item.year) === year,
    );
    if (existingItem) {
      completeData.push(existingItem);
    } else {
      completeData.push({ year: year.toString(), count: 0 });
    }
  }

  return completeData;
}

export async function fetchTopFiveLiterature() {
  const papers = await fetchAllPapers();
  const literatureCounts = papers.reduce((acc, paper) => {
    const literature = paper.literature;
    literature.map((lit) => {
      if (acc[lit]) {
        // Increment the count if it exists
        acc[lit]++;
      } else {
        // Initialize the count if it does not exist
        acc[lit] = 1;
      }
    });
    return acc;
  }, {});

  let statistics = Object.keys(literatureCounts).map((literature) => {
    return {
      id: literature,
      count: literatureCounts[literature],
    };
  });

  statistics.sort((a, b) => b.count - a.count);
  statistics = statistics.slice(0, 5);

  const completeData = [];
  await Promise.all(
    statistics.map(async (lit) => {
      const literatureData = await pb.collection("literature").getOne(lit.id);
      // console.log(literatureData);
      completeData.push({
        id: lit.id,
        title: literatureData.title,
        authors: literatureData.authors,
        count: lit.count,
      });
    }),
  );
  completeData.sort((a, b) => b.count - a.count);

  // console.log(statistics);
  // console.log(completeData);
  return completeData;
}

export async function fetchStudentUsers() {
  return await pb.collection("users").getFullList({
    cache: "no-store",
    filter: "isAdmin=false",
  });
}

export async function createUser(json) {
  try {
    json.emailVisibility = true;
    json.passwordConfirm = json.password;
    const result = await pb.collection("users").create(json);

    revalidatePath("/admin");
  } catch (error) {
    console.error(error);
    return {
      error: error.message,
    };
  }
}

export async function deleteUser(userId) {
  try {
    const result = await pb.collection("users").delete(userId);

    revalidatePath("/admin");
    return result;
  } catch (error) {
    console.error(error);
    return {
      error: error.message,
    };
  }
}
