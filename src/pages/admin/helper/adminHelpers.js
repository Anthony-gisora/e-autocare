// Submit new request will refactor later or ignore
const handleSubmit = async (e) => {
  e.preventDefault();
  const payload = {
    ...form,
    experience: parseInt(form.experience) || 0,
    skills: form.skills.split(",").map((s) => s.trim()),
  };

  try {
    await axios.post(API_URL, payload);
    setForm({ name: "", personalNumber: "", experience: "", skills: "" });
    loadRequests();
  } catch (err) {
    console.error("Failed to submit:", err);
  }
};
