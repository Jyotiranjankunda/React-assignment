import { useState } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import Checkbox from '@mui/material/Checkbox';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const departmentsData = [
  {
    department: 'customer_service',
    sub_departments: ['support', 'customer_success'],
  },
  {
    department: 'design',
    sub_departments: ['graphic_design', 'product_design', 'web_design'],
  },
  {
    department: 'Agriculture & Fishing',
    sub_departments: ['Agriculture', 'Crops', 'Farming Animals & Livestock', 'Fishery & Aquaculture', 'Ranching'],
  },
  {
    department: 'Business Services',
    sub_departments: ['Accounting & Accounting Services', 'Auctions', 'Business Services - General', 'Call Centers & Business centers', 'Career Planning', 'Career', 'Commercial Printing', 'Debt Collection'],
  }
];

const SecondPageComponent2 = () => {
  const [selectedDepartments, setSelectedDepartments] = useState<string[]>([]);
  const [selectedSubDepartments, setSelectedSubDepartments] = useState<string[]>([]);

  const handleDepartmentSelect = (department: string) => {
    const allSubDepartments =
      departmentsData.find((dep) => dep.department === department)
        ?.sub_departments || [];

    if (selectedDepartments.includes(department)) {
      setSelectedDepartments(
        selectedDepartments.filter((dep) => dep !== department)
      );
      setSelectedSubDepartments(
        selectedSubDepartments.filter(
          (subDep) => !allSubDepartments.includes(subDep)
        )
      );
    } else {
      setSelectedDepartments([...selectedDepartments, department]);
      setSelectedSubDepartments([
        ...selectedSubDepartments,
        ...allSubDepartments,
      ]);
    }
  };

  const handleSubDepartmentSelect = (subDepartment: string, parentDepartment: string) => {
    if (selectedSubDepartments.includes(subDepartment)) {
      setSelectedSubDepartments(
        selectedSubDepartments.filter((subDep) => subDep !== subDepartment)
      );
      if (
        selectedDepartments.includes(parentDepartment) &&
        selectedSubDepartments.some(
          (subDep) =>
            departmentsData
              .find((dep) => dep.department === parentDepartment)
              ?.sub_departments?.includes(subDep) ?? false
        )
      ) {
        setSelectedDepartments(
          selectedDepartments.filter((dep) => dep !== parentDepartment)
        );
      }
    } else {
      setSelectedSubDepartments([...selectedSubDepartments, subDepartment]);
      const parentSubDepartments =
        departmentsData.find((dep) => dep.department === parentDepartment)
          ?.sub_departments || [];
      if (parentSubDepartments.every((subDep) => selectedSubDepartments.includes(subDep))) {
        setSelectedDepartments([...selectedDepartments, parentDepartment]);
      }
    }
  };

  return (
    <div>
      <Typography variant="h2" gutterBottom>
        Second Page Component 2
      </Typography>
      {departmentsData.map(({ department, sub_departments }) => (
        <Accordion key={department}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            id={`${department}-header`}
            style={{ cursor: 'default' }}
            onClick={(e) => e.stopPropagation()}
          >
            <Checkbox
              edge="start"
              checked={
                selectedDepartments.includes(department) ||
                sub_departments.every((subDep) => selectedSubDepartments.includes(subDep))
              }
              onChange={(e) => {
                e.stopPropagation();
                handleDepartmentSelect(department);
              }}
              style={{ marginRight: '1rem' }}
            />
            <Typography>{department}</Typography>
          </AccordionSummary>
          <AccordionDetails style={{ display: 'flex', flexDirection: 'column' }}>
            {sub_departments.map((subDepartment) => (
              <div key={subDepartment} style={{ display: 'flex', alignItems: 'center' }}>
                <Checkbox
                  edge="start"
                  checked={selectedSubDepartments.includes(subDepartment)}
                  onChange={() =>
                    handleSubDepartmentSelect(subDepartment, department)
                  }
                  onClick={(e) => e.stopPropagation()}
                  style={{ marginRight: '1rem' }}
                />
                <Typography>{subDepartment}</Typography>
              </div>
            ))}
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
};

export default SecondPageComponent2;
