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

export async function fetchPaper(id) {
  return await pb.collection("papers").getOne(id, { cache: "no-store" });
}

export async function fetchPerson(id) {
  return await pb.collection("person").getOne(id, { cache: "no-store" });
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

export async function fetchAuthors(authorIds) {
  const authors = [];

  await Promise.all(
    authorIds.map(async (a) => {
      const authorData = await pb.collection("person").getOne(a);
      authors.push({
        id: authorData.id,
        name: authorData.name,
      });
    }),
  );

  authors.sort((a, b) => a.name.localeCompare(b.name));
  return authors;
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
