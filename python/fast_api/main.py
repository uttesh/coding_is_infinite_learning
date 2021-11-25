from fastapi import FastAPI
from item import Item
app = FastAPI()

@app.get("/")
async def root():
    return {"message":"HelloWorld"}

@app.get("/item/{item_id}")
async def get(item_id:int):
    return {"item_id":item_id}

@app.get("/item/name/{item_name}")
async def get(item_name:str):
    return {"item_name":item_name}

@app.post("/items/")
async def create(item:Item):
    return item

@app.put("/item/{item_id}")
async def update(item_id:int,item:Item):
    return {"item_id":item_id,**item.dict()}