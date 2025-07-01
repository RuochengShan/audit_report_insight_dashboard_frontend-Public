export interface ReportItemType {
  id: string;
  type: 'chapter' | 'section';
  title: string;
  contentSummary: string;
  completeness?: number; // 0-100
  missingTopics?: string[];
  relevantDocuments?: string[];
  subItems?: ReportItemType[];
  specialDisplay?: 'acronyms' | 'distributionList';
  distributionTo?: { name: string; email: string }[];
  distributionCc?: { name: string; email: string }[];
}

export const mockAcronyms = [
  { acronym: 'AWS', definition: 'Amazon Web Services' },
  { acronym: 'COBIT', definition: 'Control Objectives for Information and Related Technologies' },
  { acronym: 'DAM', definition: 'Database Activity Monitoring' },
  { acronym: 'DBA', definition: 'Database Administrator' },
  { acronym: 'ERP', definition: 'Enterprise Resource Planning' },
  { acronym: 'GDPR', definition: 'General Data Protection Regulation' },
  { acronym: 'IT', definition: 'Information Technology' },
  { acronym: 'Jira', definition: 'A popular issue tracking product developed by Atlassian' },
  { acronym: 'MAP', definition: 'Management Action Plan' },
  { acronym: 'Q4', definition: 'Fourth Quarter' },
  { acronym: 'RBAC', definition: 'Role-Based Access Control' },
  { acronym: 'TLS', definition: 'Transport Layer Security' },
];

export const mockReportData: ReportItemType[] = [
  {
    id: 'chap1',
    type: 'chapter',
    title: 'The Audit in a Snapshot',
    contentSummary: "This chapter provides a high-level overview of the audit's purpose, scope, and key takeaways. It is designed to give executive leadership a quick understanding of the audit's context and most critical conclusions without delving into technical details.",
    completeness: 80,
    missingTopics: ['List of key stakeholders and interviewees', 'Timeline of audit activities'],
    relevantDocuments: ['Audit_Charter_v3.1.pdf', 'Engagement_Letter_Final.docx', 'Initial_Planning_Memo.pdf'],
    subItems: [
      {
        id: 'sec1.1',
        type: 'section',
        title: 'Why',
        contentSummary: "The primary impetus for this audit was the recent update to the company's data handling policies (Policy A-128) and the need to ensure compliance across all customer-facing applications. The audit aims to identify any gaps in the implementation of these new policies and to provide assurance to the board that sensitive customer data is being managed in accordance with regulatory requirements and internal standards. This proactive measure is intended to mitigate risks associated with data breaches and ensure continued customer trust.",
        completeness: 90,
        missingTopics: ['Specific exclusions clearly stated', 'Rationale for scope limitations'],
        relevantDocuments: ['ScopeDefinition_v2.pdf', 'System_Inventory.xlsx'],
      },
      {
        id: 'sec1.2',
        type: 'section',
        title: 'What',
        contentSummary: "This audit covers all aspects of the user data lifecycle within the 'Phoenix' and 'Griffin' projects. The scope includes data collection points, transmission protocols, storage solutions (both ephemeral and long-term), access control mechanisms, and data disposal procedures. The audit specifically targets the production environments hosted on AWS us-east-1 and eu-central-1. Excluded from this audit are third-party vendor systems, which are covered under a separate vendor risk assessment program, and internal employee data management systems.",
        completeness: 85,
        missingTopics: ['Measurable success criteria for each objective', 'Alignment with COBIT framework'],
        relevantDocuments: ['ProjectPlan_v1.2.mpp', 'ObjectivesMatrix.xlsx'],
      },
      {
        id: 'sec1.3',
        type: 'section',
        title: 'Conclusion',
        contentSummary: "In conclusion, while the foundational elements of the new data handling policies have been implemented, we observed inconsistencies in access control enforcement and data retention practices across the two audited projects. The 'Phoenix' project demonstrated strong adherence to data encryption standards, whereas the 'Griffin' project requires remediation in its data-at-rest encryption protocols. Overall, the control environment is moderately effective, but requires targeted improvements to reach full compliance and mitigate identified risks.",
        completeness: 65,
        missingTopics: ['Executive summary graph', 'Link to overall business strategy'],
        relevantDocuments: ['Final_Conclusion_Memo.pdf'],
      },
    ],
  },
  {
    id: 'chap2',
    type: 'chapter',
    title: 'I. Objectives and Scope',
    contentSummary: 'This chapter formally defines the specific objectives and the precise boundaries of the audit engagement. It clarifies what was examined and the criteria against which systems and processes were evaluated.',
    completeness: 95,
    missingTopics: ['Root cause analysis for each finding'],
    relevantDocuments: ['Findings_Register.xlsx', 'Evidence_Package_A.zip'],
    subItems: [
      {
        id: 'sec2.1',
        type: 'section',
        title: 'Objectives',
        contentSummary: "The key objectives of this engagement were to: 1. Verify that all sensitive data transmissions are encrypted using TLS 1.2 or higher. 2. Assess whether access to production databases is restricted to authorized personnel via role-based access control (RBAC). 3. Confirm that data retention policies are being automatically enforced to delete user data after the specified period. 4. Evaluate the effectiveness of the incident response plan for a simulated data leak scenario.",
        completeness: 95,
        missingTopics: ['Cross-references to violated policies'],
        relevantDocuments: ['IncidentReport_HR001.pdf', 'Policy_Compliance_Matrix.docx'],
      },
      {
        id: 'sec2.2',
        type: 'section',
        title: 'Scope',
        contentSummary: "The scope of this audit was limited to the IT general controls over the 'Project Alpha' application suite, version 3.5.x, running in the production environment. This included the application servers, database servers, and the underlying network infrastructure. The audit period was from January 1, 2024, to June 30, 2024. Code review was not part of this engagement and is scheduled for a separate application security review in Q4.",
        completeness: 95,
        missingTopics: ['Diagram of in-scope architecture'],
        relevantDocuments: ['ControlGapAnalysis.pdf'],
      },
    ],
  },
  {
    id: 'chap3',
    type: 'chapter',
    title: 'II. Background',
    contentSummary: "This chapter provides context for the audit, including information about the process under review, previous audit activities, and the organization's plans moving forward.",
    completeness: 70,
    missingTopics: ["Process owner's statement"],
    relevantDocuments: ['Recommendation_Tracker.xlsx', 'Best_Practices_Guide.pdf'],
    subItems: [
      {
        id: 'sec3.1',
        type: 'section',
        title: 'About the Process',
        contentSummary: "The customer order fulfillment process begins when a customer places an order through the e-commerce portal and ends when the product is delivered and confirmed. The process is managed by the Logistics team and supported by the 'Orion' ERP system. Key process steps include order validation, inventory check, payment processing, warehouse picking and packing, and shipping carrier integration. The process handles an average of 5,000 orders per day.",
        completeness: 75,
        missingTopics: ['Process flow diagram'],
        relevantDocuments: ['Process_Narrative.docx'],
      },
      {
        id: 'sec3.2',
        type: 'section',
        title: 'Prior Audit Work',
        contentSummary: "An internal audit of the warehouse inventory management system was conducted in Q2 2023 (Report #2023-08). That audit identified weaknesses in physical inventory counting procedures. Two of the three recommendations from that audit were implemented and closed as of March 2024. The third recommendation, related to implementing automated barcode scanning, is still in progress and tracked under issue #IA-2023-08-03.",
        completeness: 85,
        missingTopics: ['Link to prior audit report'],
        relevantDocuments: ['Prior_Audit_Followup.xlsx'],
      },
      {
        id: 'sec3.3',
        type: 'section',
        title: 'Going Forward',
        contentSummary: "Management has initiated 'Project Starlight,' a strategic initiative to modernize the entire order fulfillment workflow. This project, scheduled to begin in the next fiscal year, aims to replace the legacy 'Orion' ERP with a new cloud-based solution. The findings and recommendations from this current audit will be used as key inputs for the design and configuration of the new system to ensure that controls are built-in from the start.",
        completeness: 50,
        missingTopics: ["Project charter for 'Project Starlight'", "Budget allocation"],
        relevantDocuments: ['Strategy_Memo_2025.pdf'],
      },
    ]
  },
  {
    id: 'chap4',
    type: 'chapter',
    title: 'III. Observations and Management Action Plans',
    contentSummary: 'This chapter details the specific observations made during the audit, including both areas of strength and opportunities for improvement. For each opportunity, a corresponding management action plan (MAP) is provided.',
    completeness: 55,
    missingTopics: ['Summary of findings by risk rating', 'Overall risk assessment'],
    relevantDocuments: ['Full_Findings_List.xlsx', 'Management_Response.docx'],
    subItems: [
      {
        id: 'sec4.1',
        type: 'section',
        title: 'Working Well',
        contentSummary: "We observed several areas where controls are well-designed and operating effectively. Specifically, the change management process for the 'Phoenix' project is mature and consistently followed, with clear documentation and approval workflows in Jira. Additionally, user access reviews are conducted quarterly in a timely manner, and the results are well-documented, demonstrating a strong commitment to the principle of least privilege.",
        completeness: 90,
        missingTopics: ['Quotes from stakeholders'],
        relevantDocuments: ['Change_Management_Policy.pdf', 'Access_Review_Q2.xlsx'],
      },
      {
        id: 'sec4.2',
        type: 'section',
        title: 'Opportunities for Improvement',
        contentSummary: "We identified an opportunity to enhance the logging and monitoring controls for the 'Griffin' project's production database. Currently, database administrator (DBA) access is not consistently logged in a way that captures the specific queries being run, creating a risk that unauthorized data modifications could go undetected. We recommend implementing a robust database activity monitoring (DAM) solution. Management Action Plan: The Infrastructure team will deploy and configure a DAM tool by Q4 2024. The CISO will be the owner of this action item.",
        completeness: 25,
        missingTopics: ['Risk rating (High/Medium/Low)', 'Financial impact estimate'],
        relevantDocuments: ['DBA_Access_Logs_Excerpt.log', 'Incident_Response_Plan.pdf'],
      },
    ]
  },
  {
    id: 'chap5',
    type: 'chapter',
    title: 'Acronyms and Abbreviations',
    contentSummary: 'A list of acronyms and abbreviations used throughout this report for clarity and brevity.',
    specialDisplay: 'acronyms',
  },
  {
    id: 'chap6',
    type: 'chapter',
    title: 'Distribution List',
    contentSummary: 'This report is intended for the following stakeholders.',
    specialDisplay: 'distributionList',
    distributionTo: [
      { name: 'Alice Johnson', email: 'alice.j@example.com' },
      { name: 'Bob Williams', email: 'bob.w@example.com' },
      { name: 'Project Lead', email: 'lead@example.com' },
    ],
    distributionCc: [
      { name: 'Charlie Brown', email: 'charlie.b@example.com' },
      { name: 'Diana Prince', email: 'diana.p@example.com' },
      { name: 'External Auditor', email: 'auditor@example.com' },
    ],
  },
];

export interface Project {
  id: string;
  name: string;
}

export const mockProjects: Project[] = [
  { id: 'P001', name: 'Project Alpha - Q3 Financial Systems Audit' },
  { id: 'P002', name: 'Project Beta - Cybersecurity Posture Review' },
  { id: 'P003', name: 'Project Gamma - GDPR Compliance Check' },
  { id: 'P004', name: 'Project Delta - Cloud Infrastructure Security Audit' },
  { id: 'P005', name: 'Project Epsilon - Vendor Risk Management Assessment' },
];
