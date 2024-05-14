export async function GET(request, { params }) {
  const searchParams = request.nextUrl.searchParams;
  const fileName = searchParams.get("fileName");

  const url = `http://127.0.0.1:8090/api/files/papers/${params.id}/${fileName}?download=1`; //todo outsource to .env
  const response = await fetch(url);
  return Response.json(response);
}
