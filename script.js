'use strict';
const Car = function (make, speed) {
  this.make = make;
  this.speed = speed;
};

const bmw = new Car('BMW', 120);
const merc = new Car('Mercedes', 95);
console.log(bmw.make, merc.speed);

Car.prototype.accelerate = function () {
  return (this.speed += 10);
};
Car.prototype.brake = function () {
  return (this.speed -= 5);
};
console.log(bmw.accelerate());
console.log(bmw.brake());
console.log(merc.accelerate());
console.log(merc.brake());

class CarCl {
  constructor(make, speed) {
    this.make = make;
    this.speed = speed;
  }

  accelerate() {
    this.speed += 10;
    console.log(`${this.make} is going at ${this.speed} km/h`);
    return this;
  }
  brake() {
    this.speed -= 5;
    console.log(`${this.make} is going at ${this.speed} km/h`);
    return this;
  }

  get speedUS() {
    return this.speed / 1.6;
  }

  set speedUS(speed) {
    this.speed = speed * 1.6;
  }
}
const ford = new CarCl('Ford', 120);
console.log(ford.make);
console.log(ford.speedUS);
ford.accelerate();
ford.accelerate();
ford.brake();
ford.speedUS = 50;
console.log(ford.speed);

//Codding challange 4
class EVCl extends CarCl {
  #charge;
  constructor(make, speed, charge) {
    super(make, speed);
    this.speed = speed;
    this.charge = charge;
  }

  chargeBattery(chargeTo) {
    this.#charge = chargeTo;
    return this;
  }
}

const Person = function (firstName, birthYear) {
  this.firstName = firstName;
  this.birthYear = birthYear;
};

Person.prototype.calcAge = function () {
  console.log(2037 - this.birthYear);
};

const Student = function (firstName, birthYear, course) {
  Person.call(this, firstName, birthYear);
  this.course = course;
};

//Linking prototypes
Student.prototype = Object.create(Person.prototype);

Student.prototype.itrnoduce = function () {
  console.log(`My name is ${this.firstName} and I study ${this.course}`);
};

const mike = new Student('Mike', 2000, 'Coputer science');
mike.itrnoduce();
mike.calcAge();
Student.prototype.constructor = Student;

const CarEV = function (make, speed, charge) {
  Car.call(this, make, speed);
  this.charge = charge;
};

CarEV.prototype = Object.create(Car.prototype);
CarEV.prototype.chargeBattery = function (chargeTo) {
  this.charge = chargeTo;
};
CarEV.prototype.constructor = CarEV;
CarEV.prototype.accelerate = function () {
  this.speed += 20;
  this.charge--;
  return console.log(
    `${this.make} going at ${this.speed} km/h, with a charge if ${this.charge}'`
  );
};

const tesla = new CarEV('Tesla', 120, 10);
tesla.chargeBattery(90);
tesla.accelerate();
tesla.brake();

console.log(tesla);

// Class declaration
class PersonCl {
  constructor(fullName, birthYear) {
    this.fullName = fullName;
    this.birthYear = birthYear;
  }

  // Instance methods
  // Methods will be added to .prototype property
  calcAge() {
    console.log(2037 - this.birthYear);
  }

  greet() {
    console.log(`Hey ${this.fullName}`);
  }

  get age() {
    return 2037 - this.birthYear;
  }

  // Set a property that already exists
  set fullName(name) {
    if (name.includes(' ')) this._fullName = name;
    else alert(`${name} is not a full name!`);
  }

  get fullName() {
    return this._fullName;
  }

  // Static method
  static hey() {
    console.log('Hey there 👋');
    console.log(this);
  }
}

class StudentCl extends PersonCl {
  constructor(fullName, birthYear, course) {
    //Always needs to happen first!
    super(fullName, birthYear);
    this.course = course;
  }

  introduce() {
    console.log(`My name is ${this.fullName} and I study ${this.course}`);
  }

  calcAge() {
    console.log(
      `I'm ${
        2037 - this.birthYear
      } years old, but as a student I feel more like ${
        2037 - this.birthYear + 10
      }`
    );
  }
}
const martha = new StudentCl('Martha Jones', 2021, 'IT');
martha.introduce();
martha.calcAge();

//Inheritance Between 'Classes': Object.create

const PersonProto = {
  calcAge() {
    console.log(2037 - this.birthYear);
  },

  init(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  },
};

const steven = Object.create(PersonProto);

const StudentProto = Object.create(PersonProto);
StudentProto.init = function (firstName, birthYear, course) {
  PersonProto.init.call(this, firstName, birthYear);
  this.course = course;
};

StudentProto.introduce = function () {
  console.log(`My name is ${this.firstName} and I study ${this.course}`);
};

const jay = Object.create(StudentProto);
jay.init('Jay', 2010, 'IT');
jay.introduce();
jay.calcAge();

// 1) Public fields
// 2) Private fields
// 3) Public methods
// 4) Private methods
// (there is also the static version)

class Account {
  // 1) public fields (instances)
  locale = navigator.locale;

  // 2) private fields (instances)
  #movements = [];
  #pin;

  constructor(owner, currency, pin) {
    this.owner = owner;
    this.currency = currency;
    //Protected property
    this.#pin = pin;
    //this._movements = [];
    //this.locale = navigator.language;

    console.log(`Thanks for opening an account`);
  }

  //Public interface

  deposit(val) {
    this.#movements.push(val);
    return this;
  }

  getMovements() {
    return this.#movements;
  }

  withdraw(val) {
    this.deposit(-val);
    return this;
  }

  requestLoan(val) {
    if (this._approveLoan) {
      this.deposit(val);
      console.log('Aproved Loan');
    }
    return this;
  }

  static helper() {
    console.log('Helper');
  }

  //Private methods
  //#approveLoan(val)
  _approveLoan(val) {
    return true;
  }
}

const acc1 = new Account('Jonas', 'EUR', 1111);
acc1.deposit(250);
acc1.withdraw(140);
acc1.requestLoan(1000);
console.log(acc1);
console.log(acc1.getMovements());
Account.helper();

//Chaining
acc1.deposit(500).deposit(200).withdraw(100).requestLoan(2000).deposit(1111);
console.log(acc1);
console.log(acc1.getMovements());

const rivian = new EVCl('Rivian', 120, 23);
rivian
  .accelerate()
  .accelerate()
  .accelerate()
  .brake()
  .chargeBattery(50)
  .accelerate();
console.log(rivian.speedUS);
