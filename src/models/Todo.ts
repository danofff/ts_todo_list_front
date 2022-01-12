class Todo {
  constructor(
    public id: string,
    public text: string,
    public userId: string,
    public createdDate: Date,
    public isDone = false
  ) {
    this.id = id;
    this.text = text;
    this.userId = userId;
    this.createdDate = createdDate;
    this.isDone = isDone;
  }
}

export default Todo;
