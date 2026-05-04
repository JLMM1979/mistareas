exports.handler = async (event) => {
  // Reconstruye el path de Notion desde la URL original
  const notionPath = event.path.replace(/^\/?notion/, '') || '/';
  const qs = event.rawQuery ? '?' + event.rawQuery : '';
  const url = 'https://api.notion.com' + notionPath + qs;

  console.log('Notion URL:', url, 'Method:', event.httpMethod);

  try {
    const res = await fetch(url, {
      method: event.httpMethod,
      headers: {
        'Authorization': 'Bearer ntn_v66938938118ZPAjtvTkE42LwlIAAi8ImrsiUBhW1xkbzx',
        'Notion-Version': '2022-06-28',
        'Content-Type': 'application/json',
      },
      body: ['GET', 'HEAD'].includes(event.httpMethod) ? undefined : event.body,
    });

    const data = await res.json();
    return {
      statusCode: res.status,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify(data),
    };
  } catch(e) {
    console.error('Proxy error:', e);
    return { statusCode: 500, body: JSON.stringify({ error: e.message }) };
  }
};
