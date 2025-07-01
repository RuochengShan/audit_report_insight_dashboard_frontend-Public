export interface EvidenceItem {
  title: string;
  content: string;
  pageNumber: number;
}

export interface AuditHistoryItem {
  date: string;
  auditName: string;
  content: string;
}

export interface ReportItemType {
  id: string;
  type: 'chapter' | 'section';
  title: string;
  contentSummary: string;
  originalContent?: string;
  completeness?: number; // 0-100
  missingTopics?: string[];
  relevantDocuments?: string[];
  evidence?: EvidenceItem[];
  auditHistory?: AuditHistoryItem[];
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
        originalContent: `The strategic decision to conduct this audit was approved by the Audit Committee on May 15, 2024. This was in direct response to the newly enacted internal Data Governance Policy A-128, which mandates a comprehensive review of all systems handling Personally Identifiable Information (PII) within 90 days of the policy's effective date. The primary goal is to provide assurance to the Board of Directors and executive management that the company is not only compliant with external regulations like GDPR and CCPA but also adheres to its own heightened internal standards for data protection. A secondary goal is to foster a culture of security-by-design by integrating audit feedback into the software development lifecycle.`,
        completeness: 90,
        missingTopics: ['Specific exclusions clearly stated', 'Rationale for scope limitations'],
        relevantDocuments: ['ScopeDefinition_v2.pdf', 'System_Inventory.xlsx'],
      },
      {
        id: 'sec1.2',
        type: 'section',
        title: 'What',
        contentSummary: "This audit covers all aspects of the user data lifecycle within the 'Phoenix' and 'Griffin' projects. The scope includes data collection points, transmission protocols, storage solutions (both ephemeral and long-term), access control mechanisms, and data disposal procedures. The audit specifically targets the production environments hosted on AWS us-east-1 and eu-central-1. Excluded from this audit are third-party vendor systems, which are covered under a separate vendor risk assessment program, and internal employee data management systems.",
        originalContent: `The scope of this audit encompasses the complete data flow and control environment for two key revenue-generating platforms: 'Project Phoenix' (customer loyalty) and 'Project Griffin' (e-commerce). \n\nIn-Scope Systems and Processes:\n- Data collection APIs and web forms.\n- In-transit encryption protocols (TLS configurations).\n- At-rest encryption for production databases (AWS RDS instances) and object storage (S3 buckets).\n- Identity and Access Management (IAM) roles and policies related to these systems.\n- Logging and monitoring configurations (CloudWatch and CloudTrail).\n- Automated data retention and deletion scripts.\n- The disaster recovery and data backup procedures.\n\nOut-of-Scope:\n- Third-party payment gateways (covered by PCI-DSS audit).\n- Corporate network infrastructure (covered by general IT controls audit).\n- Development and staging environments.`,
        completeness: 85,
        missingTopics: ['Measurable success criteria for each objective', 'Alignment with COBIT framework'],
        relevantDocuments: ['ProjectPlan_v1.2.mpp', 'ObjectivesMatrix.xlsx'],
      },
      {
        id: 'sec1.3',
        type: 'section',
        title: 'Conclusion',
        contentSummary: "In conclusion, while the foundational elements of the new data handling policies have been implemented, we observed inconsistencies in access control enforcement and data retention practices across the two audited projects. The 'Phoenix' project demonstrated strong adherence to data encryption standards, whereas the 'Griffin' project requires remediation in its data-at-rest encryption protocols. Overall, the control environment is moderately effective, but requires targeted improvements to reach full compliance and mitigate identified risks.",
        originalContent: `Our overall assessment concludes that the control environment is "Moderately Satisfactory." We have assigned this rating because while critical protective measures like data-in-transit encryption are functioning effectively, significant gaps exist that could expose the organization to moderate levels of risk. The 'Phoenix' project is largely compliant, with only minor deviations. However, the 'Griffin' project has two high-risk findings related to its database configuration that require immediate attention. If the recommended actions are implemented effectively, the control environment has the potential to be elevated to "Satisfactory" within the next six months. A follow-up audit is recommended for Q1 2025.`,
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
        originalContent: `The engagement was designed to achieve four primary objectives:\n\n1.  **Data Confidentiality:** To verify that sensitive customer data, as defined in Policy A-128, is encrypted both in transit over public networks (using TLS 1.2 or 1.3) and at rest within the production AWS environment (using AES-256).\n\n2.  **Access Integrity:** To assess the design and operational effectiveness of the Role-Based Access Control (RBAC) model. This includes reviewing user access provisioning, de-provisioning, and periodic access review processes to ensure the principle of least privilege is enforced.\n\n3.  **Data Lifecycle Management:** To confirm that the automated systems for data retention and disposal are functioning as per the schedules defined in the corporate data retention policy. This involves testing the scripts and verifying that data is being permanently deleted after its mandated lifecycle.\n\n4.  **Security Preparedness:** To evaluate the adequacy and effectiveness of the documented incident response plan through a tabletop exercise simulating a data breach scenario.`,
        completeness: 95,
        missingTopics: ['Cross-references to violated policies'],
        relevantDocuments: ['IncidentReport_HR001.pdf', 'Policy_Compliance_Matrix.docx'],
      },
      {
        id: 'sec2.2',
        type: 'section',
        title: 'Scope',
        contentSummary: "The scope of this audit was limited to the IT general controls over the 'Project Alpha' application suite, version 3.5.x, running in the production environment. This included the application servers, database servers, and the underlying network infrastructure. The audit period was from January 1, 2024, to June 30, 2024. Code review was not part of this engagement and is scheduled for a separate application security review in Q4.",
        originalContent: `The audit focused on the production environment of the 'Project Alpha' application suite, specifically versions 3.5.1 through 3.5.4. The review period for all transactional testing covered the six-month period from January 1, 2024, to June 30, 2024.\n\n**Included infrastructure:**\n- AWS Account ID: 1234-5678-9012\n- EC2 instances tagged with 'Project:Alpha' and 'Environment:Prod'.\n- RDS PostgreSQL instance: 'alpha-prod-db.cxyz123.us-east-1.rds.amazonaws.com'.\n- S3 bucket: 'alpha-prod-user-uploads'.\n\n**Excluded from scope:**\n- Source code and application logic (to be covered in a separate White Box security assessment).\n- Employee-facing administrative interfaces.\n- Third-party services integrated via API, which are subject to the Vendor Management Program.`,
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
        originalContent: `The end-to-end customer order fulfillment process is a critical business function responsible for an average revenue of $1.5 million per month. It is a highly automated workflow that relies on the interplay between the customer-facing e-commerce portal, the internal 'Orion' ERP system, and external logistics partners. The process is owned by the Vice President of Operations, Ms. Jane Doe. The process has been in place for five years and has undergone several minor revisions, but no major re-engineering in the last three years. The recent increase in order volume by 25% year-over-year has put a strain on the existing infrastructure, which prompted management to include it in this year's audit plan.`,
        completeness: 75,
        missingTopics: ['Process flow diagram'],
        relevantDocuments: ['Process_Narrative.docx'],
      },
      {
        id: 'sec3.2',
        type: 'section',
        title: 'Prior Audit Work',
        contentSummary: "A review of past audit activities and the status of previously identified issues relevant to this engagement.",
        completeness: 90,
        missingTopics: [],
        auditHistory: [
          {
            date: 'Q2 2023',
            auditName: 'Warehouse Inventory Management Controls Review (Report #2023-08)',
            content: 'Identified weaknesses in physical inventory counting procedures. Two recommendations (cycle counting, access restrictions) are closed. One recommendation (barcode scanning) is in progress and tracked as #IA-2023-08-03.',
          },
          {
            date: 'Q4 2022',
            auditName: 'Logistics Vendor Security Assessment',
            content: 'Reviewed security controls for third-party shipping carriers. No high-risk findings were noted. A recommendation to enhance API monitoring was implemented in Q1 2023.',
          },
        ],
      },
      {
        id: 'sec3.3',
        type: 'section',
        title: 'Going Forward',
        contentSummary: "Management has initiated 'Project Starlight,' a strategic initiative to modernize the entire order fulfillment workflow. This project, scheduled to begin in the next fiscal year, aims to replace the legacy 'Orion' ERP with a new cloud-based solution. The findings and recommendations from this current audit will be used as key inputs for the design and configuration of the new system to ensure that controls are built-in from the start.",
        originalContent: `The company has approved a significant capital expenditure for 'Project Starlight,' a three-year strategic initiative to replace the entire suite of logistics and fulfillment systems. The project is currently in the vendor selection phase. The findings from this audit are considered critical inputs for the project's requirements-gathering and system design phases. The Internal Audit department has been formally included as a key stakeholder in the project's steering committee to provide ongoing advisory services and ensure that the control weaknesses identified in the legacy environment are not replicated in the new system. This represents a strategic shift towards a more proactive, controls-focused approach to system implementation.`,
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
        originalContent: `**Commendation 1: Mature Change Management Process**\nDuring our review of the change management process for the 'Phoenix' project, we tested a sample of 25 production changes made during the audit period. We found that 100% of the changes had a corresponding Jira ticket with documented business justification, technical implementation plan, testing evidence, and management approval. This demonstrates a mature and effective change control process that minimizes the risk of unauthorized or disruptive changes to the production environment.\n\n**Commendation 2: Diligent User Access Reviews**\nWe verified that user access reviews for both the 'Phoenix' and 'Griffin' systems were performed for Q1 and Q2 2024. We reviewed the evidence of these reviews and found that they were completed on time, and any identified instances of excessive access were remediated within the policy-mandated 5-day window. This control is operating effectively to enforce the principle of least privilege.`,
        completeness: 90,
        missingTopics: ['Quotes from stakeholders'],
        evidence: [
          {
            title: 'Change_Management_Policy.pdf',
            content: 'All production changes must be documented in Jira, including business justification, technical implementation plan, testing evidence, and management approval before deployment.',
            pageNumber: 5,
          },
          {
            title: 'Access_Review_Q2.xlsx',
            content: 'Quarterly access review for "Phoenix" and "Griffin" completed on June 28, 2024. All identified excessive permissions were remediated within 5 business days.',
            pageNumber: 1,
          }
        ]
      },
      {
        id: 'sec4.2',
        type: 'section',
        title: 'Opportunities for Improvement',
        contentSummary: "We identified an opportunity to enhance the logging and monitoring controls for the 'Griffin' project's production database. Currently, database administrator (DBA) access is not consistently logged in a way that captures the specific queries being run, creating a risk that unauthorized data modifications could go undetected. We recommend implementing a robust database activity monitoring (DAM) solution. Management Action Plan: The Infrastructure team will deploy and configure a DAM tool by Q4 2024. The CISO will be the owner of this action item.",
        originalContent: `**Finding 2024-01: Inadequate Database Activity Logging (High Risk)**\n\n**Condition:** Our testing revealed that while DBA login and logout events for the 'Griffin' production database are logged, the native logging features of the database are not configured to record the specific SQL queries executed by privileged users. \n\n**Criteria:** According to the company's Data Security Standard (DSS-04), all privileged access to systems containing sensitive data must be logged in a manner that creates a detailed audit trail of all actions performed.\n\n**Cause:** The database was deployed using a default configuration template which did not include fine-grained auditing. The implementation team was not aware of the requirements in DSS-04.\n\n**Impact:** Without a detailed log of executed queries, the company cannot perform effective monitoring for unauthorized data access or modification. In the event of a data breach, it would be difficult or impossible to determine what data was accessed or exfiltrated by a malicious actor or a compromised insider account.\n\n**Recommendation:** Implement a Database Activity Monitoring (DAM) tool or enable advanced native auditing features to capture and retain all SQL queries run by privileged users on the 'Griffin' production database.\n\n**Management Action Plan (MAP):**\n- **Action:** The Infrastructure team will research, procure, and deploy a DAM solution for the 'Griffin' database.\n- **Responsible Party:** Chief Information Security Officer (CISO).\n- **Target Completion Date:** October 31, 2024.`,
        completeness: 25,
        missingTopics: ['Risk rating (High/Medium/Low)', 'Financial impact estimate'],
        evidence: [
            {
                title: 'DBA_Access_Logs_Excerpt.log',
                content: '`[2024-06-15 14:32:01] user=\'dba_admin\' db=\'griffin_prod\' host=\'10.1.1.5\' --- LOG: connection authorized`',
                pageNumber: 152,
            },
            {
                title: 'Data Security Standard DSS-04',
                content: 'Section 3.1.2: All privileged access to databases containing sensitive customer data (Level 3 and above) must have detailed query logging enabled. Logs must be retained for a minimum of 365 days in a secure, tamper-evident repository.',
                pageNumber: 3,
            }
        ]
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
