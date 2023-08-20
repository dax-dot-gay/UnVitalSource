from typing import Union, TypedDict, Literal

class StageWaitingPage(TypedDict):
    type: Literal["waiting_page"]
    page: int

class StageProcessingPage(TypedDict):
    type: Literal["processing_page"]
    page: int

class StageCompleted(TypedDict):
    type: Literal["complete"]

class StageNotStarted(TypedDict):
    type: Literal["not_started"]

APP_STAGES = Union[StageWaitingPage, StageProcessingPage, StageCompleted, StageNotStarted]


class ApplicationState:
    def __init__(self, start: int = 0, end: int = None) -> None:
        self.page = start
        self.end = end
        self.isbn: Union[str, None] = None
        self.stage: APP_STAGES = {"type": "not_started"}
    
    def waiting_for_page(self, page: int):
        self.stage = {"type": "waiting_page", "page": page}
    
    def processing_page(self, page: int):
        self.stage = {"type": "processing_page", "page": page}
    
    def finish(self):
        self.stage = {"type": "complete"}