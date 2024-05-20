import pb from "@/lib/pocketbase";
import { revalidatePath } from "next/cache";

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
    //const response = await fetch("http://127.0.0.1:8000/api/upload-paper") //todo communicate with backend
    revalidatePath("/papers/" + result.id);
    return result;
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
  const averagePages = 42; //todo calculate average pages
  return {
    numberOfPapers,
    numberOfAuthors,
    numberOfLiterature,
    averagePages,
  };
}
