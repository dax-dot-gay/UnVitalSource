from litestar import Controller, get, post
from litestar.datastructures import State
from litestar.di import Provide
from state import ApplicationState, APP_STAGES

async def dep_astate(state: State) -> ApplicationState:
    return state.app_state

class RootController(Controller):
    path = "/"
    dependencies = {"app_state": Provide(dep_astate)}

    @get("state")
    async def get_state(self, app_state: ApplicationState) -> APP_STAGES:
        return app_state.stage
    
    @post("setup/{isbn:str}")
    async def post_setup(self, app_state: ApplicationState, isbn: str) -> None:
        app_state.waiting_for_page(app_state.page)
        app_state.isbn = isbn
        print("Connection established - Acquiring " + isbn)
    
    @post("page/{page:int}")
    async def post_page(self, app_state: ApplicationState, page: int, data: dict) -> None:
        print(data["image"])
        app_state.waiting_for_page(page + 1)

    