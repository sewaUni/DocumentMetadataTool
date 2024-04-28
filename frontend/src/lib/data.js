import pb from "@/lib/pocketbase";

export async function fetchAllPapers() {
    return await pb.collection('papers').getFullList({
        sort: '-created',
        cache: 'no-store'
    });
}

export async function fetchPaper(id) {
    return await pb.collection('papers').getOne(id, { cache: 'no-store' });
}

export async function fetchAuthorNames(authors) {
    const authorNames = []

    await Promise.all(authors.map(async (author) => {
        const authorData = await pb.collection('person').getOne(author);
        authorNames.push(authorData.name);
    }));

    return authorNames.join(', ');
}
