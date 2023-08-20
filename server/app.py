from litestar import Litestar
from litestar.config.cors import CORSConfig
from litestar.datastructures import State
from api import RootController
from state import ApplicationState

app = Litestar(route_handlers=[RootController], state=State({"app_state": ApplicationState()}), cors_config=CORSConfig(allow_origins=["*"]))