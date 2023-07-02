from fastapi import APIRouter
from app.api import transaction, user, auth, admin, file, country, landing

router = APIRouter()

def version_one():
    router.include_router(auth.router)
    # router.include_router(user.router)
    # router.include_router(country.router)
    # router.include_router(transaction.router)
    # router.include_router(landing.router)
    # router.include_router(file.router)
    # router.include_router(admin.router)


version_one()