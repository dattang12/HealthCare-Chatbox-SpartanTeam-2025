
# 🩺 Preventive Healthcare Knowledge Builder

This project automatically collects **preventive healthcare** information from reliable medical sources such as  
**WHO, Mayo Clinic, CDC, HealthCare.gov, and HRSA**, then uses IBM **watsonx.ai** (Granite model)  
to generate **Question–Answer (Q&A)** pairs for chatbot training.

---

## 🚀 Features
- Public & legal web scraping from trusted health organizations  
- Automatic filtering of health-related content (e.g., exercise, diet, nutrition, disease prevention)  
- Q&A generation using watsonx.ai Granite models  
- Export as structured JSON for easy import into **Watsonx Assistant**

- ---

## ⚙️ Setup Instructions

- Clone the repository
```bash
git clone https://github.com/ibm-skillsbuild-preventive-healthcare-chatbot.git
cd ibm-skillsbuild-preventive-healthcare-chatbot
```
- Add environment variables using Google Colab Secrets with these names
```python
api_key = userdata.get('WATSONX_API_KEY')
project_id = userdata.get('WATSONX_PROJECT_ID')
```

## 🧠 How It Works

- The script reads URLs from scrape_url.json

- It scrapes paragraph text from each page

- Only paragraphs containing key health terms (like exercise, diet, nutrition, disease, prevention, and well-being) are kept.

- Each paragraph is sent to the Granite model to generate 3-5 diverse Q&A pairs.

- All results are saved in preventive_health_faq.json.
