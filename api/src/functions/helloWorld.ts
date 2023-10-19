import {
  app,
  HttpRequest,
  HttpResponseInit,
  InvocationContext,
} from '@azure/functions';

export async function helloWorld(
  request: HttpRequest,
  context: InvocationContext
): Promise<HttpResponseInit> {
  context.log(`Http function processed request for url "${request.url}"`);

  const name = request.query.get('name') || (await request.text()) || 'world';
  const body = {
    value: `Hello, ${name}!`,
  };

  return { jsonBody: body };
}

app.http('helloWorld', {
  methods: ['GET', 'POST'],
  authLevel: 'anonymous',
  handler: helloWorld,
});
