function Story(name, content) {
  this.name = name;
  this.content = content;
  Role.backlog().stories.push(this);
}

