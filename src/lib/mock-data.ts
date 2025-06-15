export interface ReportItemType {
  id: string;
  type: 'chapter' | 'section';
  title: string;
  contentSummary: string;
  completeness: number; // 0-100
  missingTopics: string[];
  relevantDocuments: string[];
  subItems?: ReportItemType[];
}

export const mockReportData: ReportItemType[] = [
  {
    id: 'chap1',
    type: 'chapter',
    title: 'The Audit in a Snapshot',
    contentSummary: 'Overview of the audit scope and objectives. This chapter sets the stage for the entire audit, outlining the purpose, scope, and methodology used.',
    completeness: 75,
    missingTopics: ['Detailed risk assessment methodology', 'List of key stakeholders and interviewees', 'Timeline of audit activities'],
    relevantDocuments: ['Audit_Charter_v3.1.pdf', 'Engagement_Letter_Final.docx', 'Initial_Planning_Memo.pdf'],
    subItems: [
      {
        id: 'sec1.1',
        type: 'section',
        title: 'Why',
        contentSummary: 'Defines the boundaries of the audit, including systems, processes, and locations covered.',
        completeness: 90,
        missingTopics: ['Specific exclusions clearly stated', 'Rationale for scope limitations'],
        relevantDocuments: ['ScopeDefinition_v2.pdf', 'System_Inventory.xlsx'],
      },
      {
        id: 'sec1.2',
        type: 'section',
        title: 'What',
        contentSummary: 'Lists the key objectives this audit aims to achieve, ensuring clarity and focus.',
        completeness: 60,
        missingTopics: ['Measurable success criteria for each objective', 'Alignment with COBIT framework', 'Link to overall business strategy'],
        relevantDocuments: ['ProjectPlan_v1.2.mpp', 'ObjectivesMatrix.xlsx'],
      },
      {
        id: 'sec1.3',
        type: 'section',
        title: 'Conclusion',
        contentSummary: 'Conclusion on the objectives',
        completeness: 60,
        missingTopics: ['Measurable success criteria for each objective', 'Alignment with COBIT framework', 'Link to overall business strategy'],
        relevantDocuments: ['ProjectPlan_v1.2.mpp', 'ObjectivesMatrix.xlsx'],
      },
    ],
  },
  {
    id: 'chap2',
    type: 'chapter',
    title: 'I. Objectives and Scope',
    contentSummary: 'Detailed description of audit findings, categorized by risk level and impact.',
    completeness: 40,
    missingTopics: ['Root cause analysis for each finding', 'Quantitative impact assessment', 'Positive observations or commendations'],
    relevantDocuments: ['Findings_Register.xlsx', 'Evidence_Package_A.zip'],
    subItems: [
      {
        id: 'sec2.1',
        type: 'section',
        title: 'Section 2.1: High-Risk Findings',
        contentSummary: 'Focuses on critical vulnerabilities and issues requiring immediate attention.',
        completeness: 55,
        missingTopics: ['Specific instances and locations of high-risk items', 'Cross-references to violated policies'],
        relevantDocuments: ['IncidentReport_HR001.pdf', 'Policy_Compliance_Matrix.docx'],
      },
      {
        id: 'sec2.2',
        type: 'section',
        title: 'Section 2.2: Medium-Risk Findings',
        contentSummary: 'Describes significant issues that need to be addressed in a timely manner.',
        completeness: 30,
        missingTopics: ['Potential cascading effects', 'Historical trend analysis if applicable'],
        relevantDocuments: ['ControlGapAnalysis.pdf'],
      },
    ],
  },
  {
    id: 'chap3',
    type: 'chapter',
    title: 'II. Background',
    contentSummary: 'Actionable recommendations to address identified findings and improve controls.',
    completeness: 85,
    missingTopics: ['Prioritization of recommendations based on effort/impact', 'Suggested owners for each recommendation'],
    relevantDocuments: ['Recommendation_Tracker.xlsx', 'Best_Practices_Guide.pdf'],
    subItems: [
      {
        id: 'sec3.2',
        type: 'section',
        title: 'xxxx',
        contentSummary: 'Related to the subheading under reivew',
        completeness: 30,
        missingTopics: ['Potential cascading effects', 'Historical trend analysis if applicable'],
        relevantDocuments: ['ControlGapAnalysis.pdf'],
      }
    ]
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
