class Goblin {
    constructor(x, y, width, height, gobPos) {
     
      this.speed = 0.05;
      this.body = Bodies.rectangle(x, y, width, height);
      this.width = width;
      this.height = height;
  
  
      World.add(world, this.body);
    }
    animate() {
      this.speed += 0.05;
    }
  
    remove(index) {
      this.speed = 0.05;
      this.width = 300;
      this.height = 300;
      setTimeout(() => {
        Matter.World.remove(world, boats[index].body);
        boats.splice(index, 1);
      }, 2000);
    }
  
    display() {
      var angle = this.body.angle;
      var pos = this.body.position;
      var index = floor(this.speed % this.animation.length);
  
      push();
      translate(pos.x, pos.y);
      rotate(angle);
      imageMode(CENTER);
      image(this.animation[index], 0, this.boatPosition, this.width, this.height);
      noTint();
      pop();
    }
  }