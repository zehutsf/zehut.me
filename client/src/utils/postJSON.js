const postJSON = async (url, data) => {
  const result = await fetch(url, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

  return await result.json();
};

export default postJSON;
