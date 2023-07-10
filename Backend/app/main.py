from fastapi import FastAPI
from starlette.responses import HTMLResponse
from fastapi.middleware.cors import CORSMiddleware
from app.db import db
from app.telegram.init import setup_telegram_bot
from app.version import router as final_router
# import sys
# print(sys.executable)
# print(sys.path)



app = FastAPI(
    title="AlumniPortalAPI",
    description="Building a united community of Innopolis Alumni",
    version="1.0",
)

origins = ['*']

app.add_middleware(
    CORSMiddleware,
    allow_origins= origins,
    allow_credentials= True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(final_router, prefix="/api/v1")

@app.on_event("startup")
def startup():
    print(f'db connected...')
    db.connect()

    # Running telegram bot
    setup_telegram_bot()


@app.on_event("shutdown")
def shutdown():
    print(f'db disconnected...')
    db.disconnect()


@app.get("/", response_class=HTMLResponse, include_in_schema=False)
def index():
    return """
    <!Doctype html>
    <html>
       <head>
            <title>Alumni Portal | API Documentation</title>
            <script src="https://cdn.tailwindcss.com"></script>
        </head>

        <body class="bg-slate-800 h-screen flex justify-center items-center">
            <div class="text-slate-200">
                <h1 class="text-center text-5xl mb-6">AlumniPortal API Docs</h1>
                <div class="max-w-xl mx-auto mt-16 flex justify-center">
                    <a href="./docs" class="px-6 py-4 border rounded-lg hover:bg-slate-900">Go to API documentation</a>
                </div>

            </div>
        </body>
    </html>
    """