export async function classifyImage(file) {
  const form = new FormData();
  form.append('file', file);

  const response = await fetch('https://leukemia-backend.onrender.com/', {
    method: 'POST',
    body: form,
  });

  if (!response.ok) {
    throw new Error('Failed to classify image');
  }

  return await response.json(); // { label: "...", confidence: 0.97 }
}
