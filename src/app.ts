class Department {
  protected employees: string[] = [];

  constructor(private readonly id: string, private name: string) {}

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

class ITDepartment extends Department {
  constructor(id: string, public admins: string[]) {
    super(id, "IT");
  }
}

class AccountingDepartment extends Department {
  private lastReport: string;

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

  constructor(id: string, private reports: string[]) {
    super(id, "Accounting");
    this.lastReport = reports[0];
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

const it = new ITDepartment("i1", ["Andrew"]);

it.addEmployee("Lara");
it.addEmployee("Andrew");
// accounting.employee[4] = "Karen"; // error in TS if field is private

it.describe();
it.showEmployeeInfo();
console.log(it);

const accounting = new AccountingDepartment("a1", []);
accounting.addReport("Report1");
accounting.addEmployee("John");
accounting.addEmployee("Nick");
console.log(accounting);

console.log(accounting.mostRecentReport);
accounting.mostRecentReport = "Year end report";
accounting.showReports();

// const accountingCopy = { describe: accounting.describe };
// accountingCopy.describe(); // error in TS with this of type Department in the describe method
