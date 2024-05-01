import pb from "@/lib/pocketbase";

const PAPERS_PER_PAGE = 10;

export async function fetchAllPapers() {
    return await pb.collection('papers').getFullList({
        sort: '-created',
        cache: 'no-store'
    });
}

export async function fetchFilteredPapers(query, currentPage) {
    const response = await pb.collection('papers').getList(currentPage, PAPERS_PER_PAGE,{
        sort: '-created',
        cache: 'no-store',
        filter: 'title ~ "%' + query + '%"'
    });

    return response.items;
}

export async function fetchPapersByAuthor(authorId) {
    return await pb.collection('papers').getFullList( {
        sort: '-created',
        cache: 'no-store',
        filter: 'authors @> [' + authorId + ']'
    });

}

export async function fetchPaper(id) {
    return await pb.collection('papers').getOne(id, { cache: 'no-store' });
}

export async function fetchAuthor(id) {
    return await pb.collection('person').getOne(id, { cache: 'no-store' });
}

export async function fetchAuthorNames(authorIds) {
    const authorNames = []

    await Promise.all(authorIds.map(async (author) => {
        const authorData = await pb.collection('person').getOne(author);
        authorNames.push(authorData.name);
    }));

    return authorNames.join(', ');
}

export async function fetchAuthors(authorIds) {
    const authorObjects = [];

    await Promise.all(authorIds.map(async (author) => {
        const authorData = await pb.collection('person').getOne(author);
        authorObjects.push({
            id: authorData.id,
            name: authorData.name
        });
    }));

    return authorObjects;
}
