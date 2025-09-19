export interface SalaryMonth {
  totalAllowance: number;
  totalBonuses: number;
  totalFines: number;
  total_days: number;
  total_hours: number;
  shifts: Array<{
    name: string;
    hours: number;
    salary: number;
  }>;
  salary_total: number;
  net_salary: number;
  full_name: string;
  employee_allowance: Array<{
    id: number;
    content: string;
    amount: number;
  }>;
  employee_bonuses: any[];
  employee_fines: any[];
}
