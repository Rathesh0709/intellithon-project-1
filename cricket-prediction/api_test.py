import google.generativeai as genai

genai.configure(api_key="add your own api key")
model = genai.GenerativeModel('gemini-2.5-pro')  # Updated model
response = model.generate_content("Explain quantum computing simply.")
print(response.text)
