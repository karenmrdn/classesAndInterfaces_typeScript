class Department {
  //   private id: string;
  //   private name: string;
  private employees: string[] = [];

  constructor(private readonly id: string, private name: string) {
    // this.id = id;
    // this.name = name;
  }

  describe(this: Department) {
    console.log(`Department (${this.id}): ${this.name}`);
  }

  addEmployee(employee: string) {
    this.employees.push(employee);
  }

  showEmployeeInfo() {
    console.log("Number of employees: " + this.employees.length);
    console.log(this.employees);
  }
}

const accounting = new Department("d1", "Accounting");

accounting.addEmployee("Lara");
accounting.addEmployee("Andrew");
// accounting.employee[4] = "Karen"; // error in TS if field is private

accounting.describe();
accounting.showEmployeeInfo();

// const accountingCopy = { describe: accounting.describe };
// accountingCopy.describe(); // error in TS with this of type Department in the describe method
