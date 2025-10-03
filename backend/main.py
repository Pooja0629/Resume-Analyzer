from fastapi import FastAPI, File, UploadFile
import fitz  # PyMuPDF
import spacy

app = FastAPI()
nlp = spacy.load("en_core_web_sm")
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # or ["http://localhost:5173"] for security
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Simple skills list (expand this as needed)
SKILLS = ["python", "javascript", "react", "node", "java", "html", "css", "sql", "git", "docker", "aws"]

def extract_text_from_pdf(file_path):
    text = ""
    with fitz.open(file_path) as doc:
        for page in doc:
            text += page.get_text()
    return text

def extract_skills(text):
    doc = nlp(text.lower())
    found_skills = set()
    for token in doc:
        if token.text in SKILLS:
            found_skills.add(token.text.capitalize())
    return list(found_skills)

@app.post("/upload_resume/")
async def upload_resume(file: UploadFile = File(...)):
    file_path = f"temp_{file.filename}"
    with open(file_path, "wb") as f:
        f.write(await file.read())

    text = extract_text_from_pdf(file_path)
    skills = extract_skills(text)

    return {"skills": skills}
