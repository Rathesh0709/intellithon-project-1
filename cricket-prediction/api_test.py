import google.generativeai as genai

genai.configure(api_key="AIzaSyDJXxpPWoCyej5SkQ3colRg5y0Ju9ItQqw")
model = genai.GenerativeModel('gemini-2.5-pro')  # Updated model
response = model.generate_content("Explain quantum computing simply.")
print(response.text)