export interface Report {
    title: string
    type: string
    doctor: string
    date: string
    image: string
    hospital: string
    summary?: string
    additionalDetails: {
      [key: string]: string | string[]
    }
  }
  
  

// export const reportData: Report[] = [
//   {
//     title: "MRI : Brain",
//     type: "Imaging",
//     doctor: "Dr. Surabhi Anand",
//     date: "2025-12-05",
//     image: "https://images.drlogy.com/assets/uploads/lab/image/mri%20brain%20report%20format%20-%20drlogy.webp",
//     description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
//     additionalDetails: {
//       "Clinical History": "The patient presented with occasional headaches and dizziness",
//       Findings: "This MRI of the brain reveals no significant abnormalities or pathologies.",
//     },
//   },
//   {
//     title: "Thyroid Profile",
//     type: "Labs",
//     doctor: "Dr. Surabhi Anand",
//     date: "2025-11-25",
//     image: "https://images.drlogy.com/assets/uploads/lab/image/mri%20brain%20report%20format%20-%20drlogy.webp",
//     description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
//     additionalDetails: {
//       Basophils: "0 10^3/uL",
//       "BUN/Creatinine Blood": "29",
//       "Calcium (Blood)": "8.5 - 12.0 mg/dL",
//     },
//   },
//   {
//     title: "Prescription",
//     type: "Outpatient",
//     doctor: "Dr. Surabhi Anand",
//     date: "2025-11-15",
//     image: "https://images.drlogy.com/assets/uploads/lab/image/mri%20brain%20report%20format%20-%20drlogy.webp",
//     description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
//     additionalDetails: {
//       Assessment: "Lorem ipsum dolor sit amet",
//       "Problem List": ["Atrial fibrillation", "Chest pain", "Diverticulosis of colon", "Partial colectomy"],
//     },
//   },
//   {
//     title: "HFE Analysis",
//     type: "Genetic Testing",
//     doctor: "Dr. Surabhi Anand",
//     date: "2025-09-15",
//     image: "https://images.drlogy.com/assets/uploads/lab/image/mri%20brain%20report%20format%20-%20drlogy.webp",
//     description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
//     additionalDetails: {
//       Methodology: "Normal biventricular size and systolic function with an ejection fraction of 60–65%.",
//       Interpretation: "Atrial fibrillation, chest pain, hypertensive heart disease and aneurysm of aortic root",
//     },
//   },
//   {
//     title: "Pathology : Colon",
//     type: "Pathology",
//     doctor: "Dr. Surabhi Anand",
//     date: "2025-09-05",
//     image: "https://images.drlogy.com/assets/uploads/lab/image/mri%20brain%20report%20format%20-%20drlogy.webp",
//     description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
//     additionalDetails: {
//       Diagnosis: "Descending colon, polypectomy: Colonic mucosa with benign lymphoid aggregate",
//       Findings: "Lorem ipsum dolor sit amet",
//     },
//   },
//   {
//     title: "Echocardiogram",
//     type: "Procedure",
//     doctor: "Dr. Surabhi Anand",
//     date: "2025-06-15",
//     image: "https://images.drlogy.com/assets/uploads/lab/image/mri%20brain%20report%20format%20-%20drlogy.webp",
//     description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
//     additionalDetails: {
//       Summary: "Normal biventricular size and systolic function with ejection fraction of 60–65%",
//       Note: "No abnormal valvular structures",
//     },
//   },
//   {
//     title: "Discharge Summary",
//     type: "Hospitalization",
//     doctor: "Dr. Surabhi Anand",
//     date: "2025-01-05",
//     image: "https://images.drlogy.com/assets/uploads/lab/image/mri%20brain%20report%20format%20-%20drlogy.webp",
//     description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
//     additionalDetails: {
//       "Chief Complaint":
//         "A 56-year-old man who 6 months ago had colon resection for diverticulitis, colostomy, and Hartmann pouch.",
//       Summary: "Patient now admitted for reversal of his colostomy.",
//     },
//   },
// ]

