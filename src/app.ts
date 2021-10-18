// !!! We cannot create an instance of an abstract class
abstract class Department {
  static fiscalYear = 2020;

  protected employees: string[] = [];

  constructor(protected readonly id: string, private name: string) {}

  // Static properties and methods allow us add properties and methods to classes,
  // which are not accessed on the instance of the class (we don't need to
  // call new), but which we access directly on the class.
  // !!! We cannot access static props and methods from-inside our non-static parts:
  // this.fiscalYear - error, Department.fiscalYear - ok
  // Example: Math.PI or Math.pow()
  static createEmployee(name: string) {
    return { name: name };
  }

  abstract describe(this: Department): void;

  addEmployee(employee: string) {
    this.employees.push(employee);
  }

  showEmployeeInfo() {
    console.log("Number of employees: " + this.employees.length);
    console.log(this.employees);
  }
}

class ITDepartment extends Department {
  constructor(id: string, public admins: string[]) {
    super(id, "IT");
  }

  describe() {
    console.log("IT department id: " + this.id);
  }
}

// !!! Singleton pattern is about ensuring that we always have exactly one
// instance of a certain class.
class AccountingDepartment extends Department {
  private lastReport: string;
  private static instance: AccountingDepartment;

  get mostRecentReport() {
    if (this.lastReport) {
      return this.lastReport;
    }
    throw new Error("No report found");
  }

  set mostRecentReport(value: string) {
    if (!value) {
      throw new Error("Please pass in a valid value");
    }
    this.addReport(value);
  }

  private constructor(id: string, private reports: string[]) {
    super(id, "Accounting");
    this.lastReport = reports[0];
  }

  // !!! In a static method we can access static properties using this keyword
  static getInstance() {
    if (this.instance) {
      return this.instance;
    }
    this.instance = new AccountingDepartment("d2", []);
    return this.instance;
  }

  describe() {
    console.log("Accounting department id: " + this.id);
  }

  addEmployee(name: string) {
    if (name === "John") {
      console.log("John already fired!");
      return;
    }
    this.employees.push(name);
  }

  addReport(text: string) {
    this.reports.push(text);
    this.lastReport = text;
  }

  showReports() {
    console.log(this.reports);
  }
}

const employee1 = Department.createEmployee("Anna");
console.log(employee1);
console.log(Department.fiscalYear);

const it = new ITDepartment("i1", ["Andrew"]);

it.addEmployee("Lara");
it.addEmployee("Andrew");
// accounting.employee[4] = "Karen"; // error in TS if field is private

it.describe();
it.showEmployeeInfo();
console.log(it);

// const accounting = new AccountingDepartment("a1", []);
// !!! SINGLETON
const accounting = AccountingDepartment.getInstance();
const accounting2 = AccountingDepartment.getInstance();
console.log(accounting === accounting2);
console.log(accounting, accounting2);

accounting.addReport("Report1");
accounting.addEmployee("John");
accounting.addEmployee("Nick");
console.log(accounting);

console.log(accounting.mostRecentReport);
accounting.mostRecentReport = "Year end report";
accounting.showReports();
accounting.describe();

// const accountingCopy = { describe: accounting.describe };
// accountingCopy.describe(); // error in TS with this of type Department in the describe method
