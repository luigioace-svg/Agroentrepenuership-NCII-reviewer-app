// Comprehensive study data for Agroentrepreneurship NC II

export interface Topic {
  id: string;
  title: string;
  icon: string;
  description: string;
  sections: Section[];
}

export interface Section {
  id: string;
  title: string;
  content: ContentItem[];
}

export interface ContentItem {
  type: 'definition' | 'list' | 'note' | 'table' | 'steps' | 'exam_tip' | 'key_term';
  title?: string;
  text?: string;
  items?: string[];
  term?: string;
  definition?: string;
  tableHeaders?: string[];
  tableRows?: string[][];
  steps?: { title: string; description: string }[];
}

export interface QuizQuestion {
  id: number;
  question: string;
  type: 'multiple_choice' | 'true_false' | 'enumeration' | 'identification';
  options?: string[];
  correctAnswer: string | string[];
  explanation?: string;
  module: string;
}

export interface Flashcard {
  id: number;
  term: string;
  definition: string;
  category: string;
}

export const topics: Topic[] = [
  {
    id: 'intro',
    title: 'Introduction to Agroentrepreneurship',
    icon: '🌱',
    description: 'Basic concepts, definitions, and the role of agroentrepreneurship in the agricultural sector.',
    sections: [
      {
        id: 'what-is',
        title: 'What is Agroentrepreneurship?',
        content: [
          {
            type: 'definition',
            term: 'Agroentrepreneurship',
            definition: 'The application of entrepreneurial principles — innovation, risk-taking, business management — to agricultural enterprises, aimed at creating value-added products and sustainable farm businesses.'
          },
          {
            type: 'definition',
            term: 'Agro-Entrepreneur',
            definition: 'An individual who combines farming knowledge with business acumen. Differs from a traditional farmer by emphasizing technological innovation, market orientation, and profit-driven growth — not just subsistence.'
          },
          {
            type: 'note',
            text: 'The AGROENTREPRENEURSHIP NC II Qualification consists of competencies that a person must achieve to assess market opportunities, establish farm production plan, handle finances, and market produce.'
          },
          {
            type: 'list',
            title: 'A person who has achieved this Qualification is competent to be:',
            items: [
              'Marketing Coordinator',
              'Production Coordinator'
            ]
          }
        ]
      },
      {
        id: 'core-goals',
        title: 'Core Goals & Importance',
        content: [
          {
            type: 'list',
            title: 'Core Goals of Agroentrepreneurship:',
            items: [
              'Generate profit while sustaining agricultural productivity',
              'Meet consumer needs through quality products',
              'Improve rural livelihood and food security',
              'Encourage innovation and sustainability in farming'
            ]
          },
          {
            type: 'list',
            title: 'Importance of Agroentrepreneurship:',
            items: [
              'Creates employment opportunities',
              'Strengthens food supply chains',
              'Encourages value-adding activities',
              'Develops self-reliant farmers and agribusiness owners',
              'Reduces urban migration by making rural livelihoods viable'
            ]
          },
          {
            type: 'exam_tip',
            title: 'Exam Tip',
            text: 'The primary goal of agro-entrepreneurship is ensuring sustainable practices — not merely maximizing profit or minimizing cost. It balances economic viability, ecological responsibility, and social equity.'
          }
        ]
      },
      {
        id: 'competency-units',
        title: 'Competency Units',
        content: [
          {
            type: 'table',
            title: 'Basic Competencies',
            tableHeaders: ['Code', 'Unit of Competency'],
            tableRows: [
              ['500311105', 'Participate in workplace communication'],
              ['500311106', 'Work in team environment'],
              ['500311107', 'Practice career professionalism'],
              ['500311108', 'Practice occupational health and safety procedures']
            ]
          },
          {
            type: 'table',
            title: 'Common Competencies',
            tableHeaders: ['Code', 'Unit of Competency'],
            tableRows: [
              ['AFF321201', 'Apply Safety Measures in Farm Operations'],
              ['AFF321203', 'Perform Estimation and Basic Calculation'],
              ['HCS421201', 'Provide Quality Customer Service'],
              ['HCS315202', 'Comply with Quality and Ethical Standards']
            ]
          },
          {
            type: 'table',
            title: 'Core Competencies',
            tableHeaders: ['Code', 'Unit of Competency', 'Module Title'],
            tableRows: [
              ['AFF243301', 'Assess Market Opportunities', 'Assessing Market Opportunities'],
              ['AFF243302', 'Establish Farm Production Plan', 'Establishing Farm Production Plan'],
              ['AFF243303', 'Handle Finances', 'Handling Finances'],
              ['AFF243304', 'Market Produce', 'Marketing Produce']
            ]
          }
        ]
      }
    ]
  },
  {
    id: 'market',
    title: 'Assess Market Opportunities (UC1)',
    icon: '📊',
    description: 'Market research, buyer identification, supply chain, value-adding activities, and marketing plan preparation.',
    sections: [
      {
        id: 'market-concepts',
        title: 'Market Concepts',
        content: [
          {
            type: 'definition',
            term: 'Market',
            definition: 'Where the customer and buyer meet. It is where exchange of goods and services happens between producers and consumers.'
          },
          {
            type: 'definition',
            term: 'Market Research',
            definition: 'The process of evaluating the feasibility of a new product or service through research conducted directly with potential consumers.'
          },
          {
            type: 'definition',
            term: 'Market Mapping',
            definition: 'A visual representation of market players and product flow. It helps identify gaps, opportunities, and threats in the market.'
          },
          {
            type: 'definition',
            term: 'Supply Chain',
            definition: 'The movement of products from producers to consumers. It includes all the activities and organizations involved in producing and delivering a product.'
          },
          {
            type: 'definition',
            term: 'Value Chain',
            definition: 'Activities that add value to products as they move from raw materials to finished goods ready for the consumer.'
          }
        ]
      },
      {
        id: 'buyers',
        title: 'Kinds of Buyers',
        content: [
          {
            type: 'list',
            title: 'Types of Buyers in the Market:',
            items: [
              'Traders — Individual who engages in buying and selling in the market',
              'Trader Agents — Entrepreneur who works as intermediary to connect buyers and sellers (brokers)',
              'Institutional Buyers — Companies/organizations that purchase very large quantities (hospitals, schools, colleges, prisons, hotels)',
              'Wholesalers — Sell products in bulk to various outlets or retailers for onward sale',
              'Retailers — Sell products directly to customers for a profit',
              'Local/Public Market — Made up of small independent businesses, each shop/stall is owner-operated',
              'Consumers — End users in the distribution chain who do not resell the items they bought'
            ]
          },
          {
            type: 'list',
            title: '3 Kinds of Buyers by Spending Behavior:',
            items: [
              'Tightwads — Spendthrifts — Average Spenders'
            ]
          }
        ]
      },
      {
        id: 'supply-demand',
        title: 'Supply and Demand',
        content: [
          {
            type: 'definition',
            term: 'Supply',
            definition: 'The quantity of goods that producers are willing to produce and sell. Price ↑ Supply ↑ | Price ↓ Supply ↓'
          },
          {
            type: 'definition',
            term: 'Demand',
            definition: 'The quantity of goods that consumers are willing to buy. Price ↑ Demand ↓ | Price ↓ Demand ↑'
          },
          {
            type: 'note',
            text: 'Understanding supply and demand helps farmers plan what crops to grow, when to plant and harvest, and where to sell for the best prices.'
          },
          {
            type: 'list',
            title: 'Factors Affecting Supply:',
            items: ['Production cost', 'Weather conditions', 'Technology', 'Availability of inputs']
          },
          {
            type: 'list',
            title: 'Factors Affecting Demand:',
            items: ['Consumer income', 'Preferences', 'Population', 'Seasonal trends']
          }
        ]
      },
      {
        id: 'buyer-selection',
        title: 'Basis for Choosing Buyers',
        content: [
          {
            type: 'list',
            title: 'Market Segmentation Criteria:',
            items: [
              'Demographic — Age, gender, religion, income, education, family size, ethnicity',
              'Psychographic — Values, beliefs, opinions, interests',
              'Geographical — Location, language, climate',
              'Behavioral — Purchase behavior, occasion, usage rate, benefits sought, loyalty'
            ]
          },
          {
            type: 'steps',
            title: 'Steps to Select Buyers:',
            steps: [
              { title: 'Meet your financial exit goals', description: 'Calculate net proceeds after transaction costs, taxes and debts' },
              { title: 'Consider transaction structure', description: 'Affects taxes owed, cash at closing, and timing of transition' },
              { title: 'Understand buyer assumptions', description: 'Buyer will perform due diligence to confirm information' },
              { title: 'Weigh if buyer can close', description: 'Ensure buyer has financing commitment and experience' },
              { title: 'Assess your readiness', description: 'Consider if personally ready for the transition' }
            ]
          }
        ]
      },
      {
        id: 'value-adding',
        title: 'Value-Adding Activities',
        content: [
          {
            type: 'definition',
            term: 'Value-Adding Activities',
            definition: 'Processes or activities within a business that increase the value of a product or service to the customer.'
          },
          {
            type: 'list',
            title: 'Types of Value-Adding Activities:',
            items: [
              'Cleaning — Removing unwanted substances, dirt, impurities',
              'Sorting — Arranging items systematically by criterion',
              'Packaging — Enclosing/protecting products for distribution, storage, sale',
              'Processing — Series of activities to transform raw materials into finished goods',
              'Transporting — Movement of goods from one location to another',
              'Product Consolidation — Merging smaller quantities into larger ones for efficiency'
            ]
          },
          {
            type: 'exam_tip',
            title: 'Why Add Value?',
            text: 'Value-adding increases revenue, creates a loyal market by focusing on customer needs, and enhances branding.'
          }
        ]
      },
      {
        id: 'marketing-mix',
        title: 'Marketing Mix (4Ps & 4Cs)',
        content: [
          {
            type: 'table',
            title: '4Ps of Marketing vs 4Cs of Marketing',
            tableHeaders: ['4Ps (Producer View)', '4Cs (Consumer View)'],
            tableRows: [
              ['Product', 'Customer Value'],
              ['Price', 'Cost'],
              ['Place', 'Convenience'],
              ['Promotion', 'Communication']
            ]
          },
          {
            type: 'definition',
            term: 'SMART Objectives',
            definition: 'Specific, Measurable, Achievable, Relevant, and Time-bound goals that guide marketing activities.'
          }
        ]
      },
      {
        id: 'market-risks',
        title: 'Market Risks & Contingency Planning',
        content: [
          {
            type: 'list',
            title: 'Types of Market Risks:',
            items: ['Exchange rate fluctuations', 'Share price changes', 'Interest rate changes', 'Commodity price changes']
          },
          {
            type: 'definition',
            term: 'Contingency Plan',
            definition: 'A plan prepared to address unexpected events, crisis, or problems that may affect the business. It is part of risk management strategy to maintain operations during challenges.'
          },
          {
            type: 'note',
            text: 'Marketing objectives should be SMART — Specific, Measurable, Achievable, Relevant, and Time-bound.'
          }
        ]
      }
    ]
  },
  {
    id: 'production',
    title: 'Establish Farm Production Plan (UC2)',
    icon: '🌾',
    description: 'Farm assessment, production planning, supplier selection, record keeping, and risk management.',
    sections: [
      {
        id: 'farm-assessment',
        title: 'Basic Farm Assessment',
        content: [
          {
            type: 'list',
            title: 'Data to Gather for Farm Assessment:',
            items: [
              'Farm & Owner Details',
              'Land Suitability & Climate',
              'Soils',
              'Water/Irrigation',
              'Road Access',
              'Equipment Usage',
              'Infrastructure (Housing & Storage)',
              'Power Supply',
              'Neighbor Relations',
              'Phone Reception',
              'Restricted Areas',
              'Records'
            ]
          },
          {
            type: 'list',
            title: 'Methods of Gathering Farm Data:',
            items: ['Site Visit', 'Soil Survey', 'Water Classification', 'Land Measurement']
          }
        ]
      },
      {
        id: 'production-plan',
        title: 'Components of Farm Production Plan',
        content: [
          {
            type: 'list',
            title: 'Key Components:',
            items: [
              'Values, Vision, Mission, and Goals for the Farm (SMART)',
              'Production Targets',
              'Production Requirements',
              'Production Costs',
              'Production Schedule',
              'Risk Management Plan'
            ]
          },
          {
            type: 'list',
            title: 'Production Activities:',
            items: [
              'Planting',
              'Fertilizer Application',
              'Pesticides Application',
              'Implementation of Bio-security Measures',
              'Irrigation/Watering',
              'Weeding',
              'Harvesting',
              'Post-harvesting'
            ]
          }
        ]
      },
      {
        id: 'risks',
        title: 'Production Risk Management',
        content: [
          {
            type: 'list',
            title: 'Production Risks:',
            items: ['Pest & Diseases', 'Typhoons', 'Equipment & Machineries Breakdown']
          },
          {
            type: 'list',
            title: 'How to Handle Risks:',
            items: [
              'Diversification',
              'Excess Capacity',
              'Lease Arrangement',
              'Information (Records)',
              'New Technologies',
              'Insurance (major tool for lawsuits)'
            ]
          },
          {
            type: 'note',
            text: 'To improve farm production plan: assess crop yield, input usage, labor, finances; use SWOT Analysis; set SMART goals; conduct research; optimize crop selection; implement sustainable practices.'
          }
        ]
      },
      {
        id: 'suppliers',
        title: 'Selecting Suppliers',
        content: [
          {
            type: 'list',
            title: 'Criteria for Selecting Suppliers:',
            items: ['Price', 'Payment Terms', 'Delivery', 'Good long-term relationship', 'Reputation', 'Products/Service quality']
          }
        ]
      },
      {
        id: 'records',
        title: 'Record Keeping',
        content: [
          {
            type: 'definition',
            term: 'Farm Record Keeping',
            definition: 'A fundamental aspect of farm management that contributes to better decision-making, compliance, resource optimization, and risk management.'
          },
          {
            type: 'note',
            text: '"Running a business without record is like running a clock without hands." — A famous economist'
          },
          {
            type: 'list',
            title: 'Why Keep Records?',
            items: [
              'Easy recall of what happened to crops',
              'Track which varieties perform best',
              'Monitor effective pest management practices',
              'Compute and determine farm income',
              'Detect causes of income losses',
              'Aid in making future decisions'
            ]
          },
          {
            type: 'list',
            title: 'Tips in Record Keeping:',
            items: ['Keep It Simple', 'Record Immediately', 'Record Accurately', 'Organize']
          }
        ]
      },
      {
        id: 'farm-budget',
        title: 'Farm Planning and Budgeting',
        content: [
          {
            type: 'definition',
            term: 'Farm Planning',
            definition: 'Creating a roadmap for farming activities — deciding what crops to plant, when, how much to produce, and what resources are needed.'
          },
          {
            type: 'list',
            title: 'Uses of Farm Plans:',
            items: [
              'Tool for preparing necessary activities',
              'Record of all preparations needed',
              'Reminder when to conduct operations (schedule)',
              'Guide for analysis and effective farm operations'
            ]
          },
          {
            type: 'steps',
            title: 'Farm Planning Procedure:',
            steps: [
              { title: 'Step 1: Review Goals', description: 'Include farm & personal goals; maximize profit; maintain financial independence' },
              { title: 'Step 2: Inventory Resources', description: 'Land, machinery, labor, capital, management skills, other resources' },
              { title: 'Step 3: Identify Alternatives', description: 'Based on resource inventory, estimate resource requirements' },
              { title: 'Step 4: Estimate Gross Margin', description: 'Gross Margin = Total Revenue - Variable Costs' },
              { title: 'Step 5: Prepare Farm Budget', description: 'Complete budget or partial budget approach' }
            ]
          },
          {
            type: 'definition',
            term: 'Complete Budget',
            definition: 'Summarizes ALL expenses and returns; net return reflects performance of the entire farm.'
          },
          {
            type: 'definition',
            term: 'Partial Budget',
            definition: 'Considers ONLY items affected by adoption of some changes. Helps determine which alternative is better.'
          }
        ]
      }
    ]
  },
  {
    id: 'finance',
    title: 'Handle Finances (UC3)',
    icon: '💰',
    description: 'Budget planning, financial services, loans, investments, and record keeping for farm finances.',
    sections: [
      {
        id: 'finance-basics',
        title: 'Basic Financial Concepts',
        content: [
          {
            type: 'definition',
            term: 'Budgeting',
            definition: 'The process of creating a plan to spend your money. The spending plan is called a budget.'
          },
          {
            type: 'definition',
            term: 'Business Plan',
            definition: 'A document that outlines the financial and operational goals of a business and shows how these goals will be achieved.'
          },
          {
            type: 'list',
            title: 'Principles of Finance:',
            items: [
              'Time Value of Money',
              'The Risk-Return Trade-Off',
              'Cash Flows are the Source of Value',
              'Market Prices Reflect Information'
            ]
          },
          {
            type: 'definition',
            term: 'Gross Profit',
            definition: 'Sales minus Cost of Goods Sold. Gross Profit = Sales - COGS'
          },
          {
            type: 'definition',
            term: 'Gross Profit Margin',
            definition: 'Gross Profit / Sales = Gross Profit Margin. Expressed as a percentage to track profitability trends.'
          }
        ]
      },
      {
        id: 'budget-types',
        title: 'Types of Budget',
        content: [
          {
            type: 'list',
            title: 'Types of Budget:',
            items: [
              'Master Budget — Aggregation of lower-level budgets from different functional areas',
              'Operating Budget — Shows projected revenue and associated expenses (similar to P&L)',
              'Cash Budget — Estimates money coming in and going out for a specific period',
              'Financial Budget — Understands capital needed for short-term and long-term needs',
              'Labor Budget — Determines workforce required to achieve goals',
              'Static Budget — Fixed estimate of revenue and expenses throughout the year'
            ]
          }
        ]
      },
      {
        id: 'financial-providers',
        title: 'Financial Service Providers',
        content: [
          {
            type: 'list',
            title: 'Types of Financial Institutions:',
            items: [
              'Central Banks — Oversight and management of all other banks',
              'Retail and Commercial Banks — Serve consumers and businesses',
              'Internet Banks — Online-only banking platforms',
              'Credit Unions — Serve specific demographics, owned by members',
              'Savings and Loan Associations — Focus on individual consumers',
              'Investment Banks and Companies — Help raise capital through securities',
              'Brokerage Firms — Assist buying and selling of securities',
              'Insurance Companies — Protection against financial loss',
              'Mortgage Companies — Originate or fund mortgage loans'
            ]
          },
          {
            type: 'list',
            title: 'Criteria in Selecting Financial Service Providers:',
            items: ['Farm Plan Schedule', 'Terms & Conditions', 'Requirements', 'Regulation']
          }
        ]
      },
      {
        id: 'loans',
        title: 'Loan Process and Payment',
        content: [
          {
            type: 'list',
            title: 'Basic Loan Requirements:',
            items: ['Business Plan', 'Supply Plan', 'Barangay Clearance or Certification', 'Proof of Land Ownership']
          },
          {
            type: 'list',
            title: 'Payment (Loan Amortization) Options:',
            items: ['Monthly', 'Quarterly', 'Annually', 'Lump-sum Payments']
          },
          {
            type: 'list',
            title: 'Loan Terms and Conditions:',
            items: ['Interest Rate', 'Bank Charges', 'Loan Repayment Period', 'Grace Period']
          }
        ]
      },
      {
        id: 'cooperatives',
        title: 'Cooperatives',
        content: [
          {
            type: 'list',
            title: 'Membership Requirements in Cooperatives:',
            items: [
              'Must have an approved application for membership',
              'Must have completed pre-membership education training',
              'Must have subscribed and paid required share for capital build-up and membership fee',
              'Must have a cultivating land either owned or leased'
            ]
          }
        ]
      },
      {
        id: 'investment',
        title: 'Investment Options',
        content: [
          {
            type: 'list',
            title: 'Investment Options:',
            items: [
              'Acquiring Assets (Land, Machinery, Building)',
              'Expanding and Diversifying the Farm (polyculture, variety selection)',
              'Saving'
            ]
          },
          {
            type: 'definition',
            term: 'Net Income',
            definition: 'Total revenue minus total expenses. Indicates the profitability of the farm business.'
          },
          {
            type: 'definition',
            term: 'Dividend',
            definition: 'Distribution of a portion of earnings to shareholders/members.'
          },
          {
            type: 'definition',
            term: 'Patronage Refund',
            definition: 'Refund given to members based on their patronage of the cooperative.'
          }
        ]
      }
    ]
  },
  {
    id: 'marketing-produce',
    title: 'Market Produce (UC4)',
    icon: '📢',
    description: 'Price monitoring, marketing strategies, selling produce, and recording transactions.',
    sections: [
      {
        id: 'trading-centers',
        title: 'Buyers and Trading Centers',
        content: [
          {
            type: 'list',
            title: 'Types of Buyers and Trading Centers:',
            items: [
              'Retailers',
              'Wholesalers',
              'Brokers and Handlers',
              'Cooperatives',
              'Manufacturers',
              'Public Market',
              'Grocery/Supermarket',
              'Restaurant',
              'Institutional Buyers'
            ]
          },
          {
            type: 'list',
            title: 'Types of Manufacturers:',
            items: [
              'Made to Stock (MTS) — Produce quantities based on forecasted demand',
              'Made to Order (MTO) — Produce only when orders are received',
              'Made to Assemble (MTA) — Create basic parts that can be quickly assembled when ordered'
            ]
          }
        ]
      },
      {
        id: 'price-monitoring',
        title: 'Price Monitoring',
        content: [
          {
            type: 'definition',
            term: 'Price Monitoring',
            definition: 'Gives an overview of how a product is performing in the market. Essential for making informed pricing decisions.'
          },
          {
            type: 'list',
            title: 'Sources of Price Information:',
            items: [
              'Farm gate Prices/Producers',
              'Trading Centers',
              'Local Market/Retail'
            ]
          },
          {
            type: 'list',
            title: 'Local Marketing Pricing Strategies:',
            items: [
              'Price Skimming',
              'Penetration Pricing',
              'Competitive Pricing',
              'Premium Pricing',
              'Loss Leader Pricing',
              'Psychological Pricing',
              'Value Pricing'
            ]
          }
        ]
      },
      {
        id: 'marketing-strategies',
        title: 'Marketing Strategies',
        content: [
          {
            type: 'list',
            title: 'Marketing Arrangements:',
            items: [
              'Contract Farming — Forward agreement for production & supply',
              'Individual Marketing — One-on-one customer, FB, Online marketplace',
              'Group Marketing (COOP) — Collective selling through cooperatives'
            ]
          },
          {
            type: 'list',
            title: 'Business Development Service Providers (BDSPs):',
            items: ['Trucking', 'Warehousing', 'Training', 'Pre and post-harvest facilities', 'Cold Storage', 'Packaging Service Providers']
          },
          {
            type: 'note',
            text: 'BDSPs can help maintain business success by providing knowledge and skills that support your business.'
          }
        ]
      },
      {
        id: 'value-adding-produce',
        title: 'Value-Adding and Selling',
        content: [
          {
            type: 'list',
            title: 'Value-Adding Activities:',
            items: ['Processing', 'Packaging', 'Sorting', 'Cleaning', 'Peeling']
          },
          {
            type: 'list',
            title: 'Steps in Preparing Produce for Selling:',
            items: ['Quality Control', 'Proper Handling', 'Packaging and Labelling']
          },
          {
            type: 'list',
            title: '6 Segmental Choice Criteria Used by Companies When Buying:',
            items: ['Quality', 'Price and Life Cycle Costs', 'Continuity of Supply', 'Perceived Risk', 'Personal Likes and Dislikes', 'Implications for Marketers']
          }
        ]
      }
    ]
  },
  {
    id: 'safety',
    title: 'Safety & Common Competencies',
    icon: '⚠️',
    description: 'Farm safety measures, estimation, customer service, quality standards, and workplace professionalism.',
    sections: [
      {
        id: 'farm-safety',
        title: 'Apply Safety Measures in Farm Operations',
        content: [
          {
            type: 'definition',
            term: 'PPE',
            definition: 'Personal Protective Equipment — equipment used for safety including mask, gloves, goggles, hair net, face shield, ear muffs, apron/gown.'
          },
          {
            type: 'list',
            title: 'Hazards in the Workplace:',
            items: [
              'Physical hazards — impact, illumination, pressure, noise, vibration, temperature, radiation',
              'Biological hazards — bacteria, viruses, plants, parasites, molds, fungi, insects',
              'Chemical hazards — dusts, fibers, mists, fumes, smoke, gasses, vapors',
              'Ergonomic hazards — over exertion, awkward positions, fatigue'
            ]
          },
          {
            type: 'list',
            title: 'Safety Measures:',
            items: [
              'Wear appropriate PPE during farm operations',
              'Read and follow operator manuals before operating machinery',
              'Handle pesticides with gloves, mask, and protective clothing',
              'Clean and store tools properly after use',
              'Use legs and keep back straight when lifting heavy loads',
              'Keep fire extinguishers accessible',
              'Wash immediately with plenty of water if chemical spills on skin',
              'Ensure proper ventilation when using chemicals',
              'Store chemicals in locked, labeled cabinets away from food'
            ]
          },
          {
            type: 'list',
            title: 'Contingency Measures During Emergencies:',
            items: ['Evacuation', 'Isolation', 'Decontamination', 'Calling designated emergency personnel']
          }
        ]
      },
      {
        id: 'customer-service',
        title: 'Provide Quality Customer Service',
        content: [
          {
            type: 'list',
            title: 'Customer Needs, Wants, and Demands:',
            items: [
              'Needs — Basic requirements (food, shelter)',
              'Wants — Specific desires (organic vegetables)',
              'Demands — Wants backed by purchasing power'
            ]
          },
          {
            type: 'list',
            title: 'Ways to Delight Customers:',
            items: ['Product Knowledge', 'Quality Service', 'Exceeding Expectations', 'Client Satisfaction Surveys']
          }
        ]
      },
      {
        id: 'workplace',
        title: 'Workplace Competencies',
        content: [
          {
            type: 'list',
            title: 'Stephen Covey\'s 7 Habits of Highly Effective People:',
            items: [
              'Be proactive (instead of reactive)',
              'Begin with the end in mind',
              'First things first',
              'Think win-win',
              'Seek first to understand, then to be understood',
              'Synergize',
              'Sharpen the saw (continuous self-improvement)'
            ]
          },
          {
            type: 'definition',
            term: 'Self-Regulation',
            definition: 'The ability to pause before taking action on a feeling. It helps you stay focused on short and long-term goals and promotes effective interpersonal relationships.'
          },
          {
            type: 'list',
            title: 'Four Components of Self-Regulation:',
            items: ['Standards', 'Motivation', 'Monitoring', 'Willpower']
          },
          {
            type: 'list',
            title: 'Counterproductive Work Behaviors (CWB):',
            items: ['Lateness', 'Bullying', 'Absenteeism', 'Theft', 'Fraud', 'Taking extended breaks', 'Excessive chatting']
          }
        ]
      },
      {
        id: 'tools',
        title: 'Farm Tools and Equipment',
        content: [
          {
            type: 'list',
            title: 'Common Farm Tools:',
            items: ['Shovel', 'Spade', 'Rake', 'Hoe', 'Hand Trowel', 'Hand Cultivator']
          },
          {
            type: 'list',
            title: 'Common Farm Equipment:',
            items: ['Grass Cutter', 'Power Sprayer', 'Hand Tractor', 'Plow', 'Rotovator', 'Sprayers', 'Combine Harvester', 'Pump Units']
          },
          {
            type: 'note',
            text: 'Regular equipment maintenance reduces the risk of injury and unexpected downtimes. Defective tools can be identified through visual inspection checking for dullness, sharpness, and dismantled parts.'
          }
        ]
      }
    ]
  },
  {
    id: 'record-keeping',
    title: 'Perform Record-Keeping',
    icon: '📋',
    description: 'Inventory activities, production records, financial records, and monitoring methods.',
    sections: [
      {
        id: 'inventory',
        title: 'Inventory Activities',
        content: [
          {
            type: 'list',
            title: 'Inventory Inputs:',
            items: [
              'Plant — Planting materials, Fertilizer, Concoctions (Pesticides and insecticides), Beneficial microorganisms',
              'Miscellaneous materials'
            ]
          },
          {
            type: 'list',
            title: 'Production Activities for Plants:',
            items: ['Planting', 'Fertilizer application', 'Pesticides application', 'Bio-security measures', 'Irrigation/watering', 'Weeding', 'Harvesting', 'Post-harvesting']
          }
        ]
      },
      {
        id: 'production-records',
        title: 'Production Records',
        content: [
          {
            type: 'definition',
            term: 'Growth Rate',
            definition: 'Describes the rate of change in the value of a specific metric across a given time period, expressed as a percentage.'
          },
          {
            type: 'definition',
            term: 'Survival Rate',
            definition: 'A statistical measure that summarizes the likelihood of different outcomes for plants at a particular point in time.'
          },
          {
            type: 'list',
            title: 'Production Cost Components:',
            items: ['Labor', 'Inputs', 'Tools, equipment and facility depreciation cost', 'Administrative cost', 'Miscellaneous']
          }
        ]
      },
      {
        id: 'smart-farming',
        title: 'Smart Agriculture Monitoring',
        content: [
          {
            type: 'list',
            title: 'Smart Agriculture Monitoring Solutions:',
            items: [
              'Soil condition monitoring — moisture, salinity, temperature',
              'Weather monitoring — temperature, precipitation, humidity, wind speed',
              'Greenhouse automation systems — maintain optimal microclimate conditions',
              'Crop monitoring systems — track diseases, pests, environmental conditions',
              'Digital pest management — pinpoint pest activity and location',
              'End-to-end farm management systems — comprehensive data collection and analytics'
            ]
          }
        ]
      }
    ]
  }
];

// Comprehensive quiz questions
export const quizQuestions: QuizQuestion[] = [
  // Multiple Choice
  { id: 1, question: 'What is agroentrepreneurship?', type: 'multiple_choice', options: ['A. Combination of agriculture and entrepreneurship', 'B. Type of machinery', 'C. Government tax', 'D. Chemical farming'], correctAnswer: 'A', explanation: 'Agroentrepreneurship is the combination of agriculture and entrepreneurship.', module: 'Introduction' },
  { id: 2, question: 'Which of the following is part of the 4Ps of marketing?', type: 'multiple_choice', options: ['A. Product', 'B. Prayer', 'C. Process', 'D. Permission'], correctAnswer: 'A', explanation: 'The 4Ps are Product, Price, Place, and Promotion.', module: 'Marketing' },
  { id: 3, question: 'What does market research help identify?', type: 'multiple_choice', options: ['A. Customer needs', 'B. Weather forecast only', 'C. Farm animals', 'D. Political parties'], correctAnswer: 'A', explanation: 'Market research helps identify customer needs and preferences.', module: 'Market' },
  { id: 4, question: 'Which refers to consumers willing to buy products?', type: 'multiple_choice', options: ['A. Demand', 'B. Supply', 'C. Inventory', 'D. Capital'], correctAnswer: 'A', explanation: 'Demand refers to the quantity consumers are willing to buy.', module: 'Market' },
  { id: 5, question: 'What is budgeting?', type: 'multiple_choice', options: ['A. Planning income and expenses', 'B. Planting seeds', 'C. Harvesting crops', 'D. Transporting products'], correctAnswer: 'A', explanation: 'Budgeting is planning income and expenses.', module: 'Finance' },
  { id: 6, question: 'What best describes supply chain?', type: 'multiple_choice', options: ['A. Movement of products from producers to consumers', 'B. A form of gambling', 'C. A political strategy', 'D. A transportation fee'], correctAnswer: 'A', explanation: 'Supply chain is the movement of products from producers to consumers.', module: 'Market' },
  { id: 7, question: 'What does PPE stand for?', type: 'multiple_choice', options: ['A. Personal Protective Equipment', 'B. Professional Production Equipment', 'C. Plant Processing Engine', 'D. Product Packaging Equipment'], correctAnswer: 'A', explanation: 'PPE stands for Personal Protective Equipment.', module: 'Safety' },
  { id: 8, question: 'What is the primary goal of agroentrepreneurship?', type: 'multiple_choice', options: ['A. Ensuring sustainable practices', 'B. Maximizing profit only', 'C. Minimizing costs only', 'D. Industrializing rural areas'], correctAnswer: 'A', explanation: 'The primary goal is ensuring sustainable practices, not merely maximizing profit.', module: 'Introduction' },
  { id: 9, question: 'What is value chain?', type: 'multiple_choice', options: ['A. Activities that add value to products', 'B. A chain for farm animals', 'C. A transportation route', 'D. A financial statement'], correctAnswer: 'A', explanation: 'Value chain refers to activities that add value to products.', module: 'Market' },
  { id: 10, question: 'What describes cash flow?', type: 'multiple_choice', options: ['A. Movement of money in and out of business', 'B. Water flow in irrigation', 'C. Movement of goods', 'D. Employee turnover'], correctAnswer: 'A', explanation: 'Cash flow is the movement of money in and out of the business.', module: 'Finance' },
  { id: 11, question: 'What is the first step in market analysis?', type: 'multiple_choice', options: ['A. Identifying target markets', 'B. Product development', 'C. Competitor research', 'D. Price setting'], correctAnswer: 'A', explanation: 'The first step is always identifying target markets.', module: 'Market' },
  { id: 12, question: 'What does IPM stand for?', type: 'multiple_choice', options: ['A. Integrated Pest Management', 'B. International Product Market', 'C. Internal Process Method', 'D. Integrated Production Method'], correctAnswer: 'A', explanation: 'IPM stands for Integrated Pest Management.', module: 'Production' },
  { id: 13, question: 'What is a SMART objective?', type: 'multiple_choice', options: ['A. Specific, Measurable, Achievable, Relevant, Time-bound', 'B. Simple, Manageable, Accurate, Realistic, Timely', 'C. Strategic, Marketable, Actionable, Reasonable, Targeted', 'D. Standard, Methodical, Attainable, Reliable, Tested'], correctAnswer: 'A', explanation: 'SMART = Specific, Measurable, Achievable, Relevant, Time-bound.', module: 'Marketing' },
  { id: 14, question: 'What is organic farming?', type: 'multiple_choice', options: ['A. Farming using natural methods', 'B. Farming with chemicals only', 'C. Factory farming', 'D. Indoor farming'], correctAnswer: 'A', explanation: 'Organic farming uses natural methods without synthetic chemicals.', module: 'Production' },
  { id: 15, question: 'What is risk management?', type: 'multiple_choice', options: ['A. Process of minimizing business risks', 'B. Avoiding all risks', 'C. Taking maximum risks', 'D. Ignoring potential problems'], correctAnswer: 'A', explanation: 'Risk management is the process of minimizing business risks.', module: 'Finance' },
  { id: 16, question: 'What is the formula for Gross Profit?', type: 'multiple_choice', options: ['A. Sales - Cost of Goods Sold', 'B. Sales + Expenses', 'C. Revenue - Taxes', 'D. Income + Costs'], correctAnswer: 'A', explanation: 'Gross Profit = Sales - Cost of Goods Sold.', module: 'Finance' },
  { id: 17, question: 'What is a contingency plan?', type: 'multiple_choice', options: ['A. A plan for unexpected events', 'B. A regular business plan', 'C. A marketing strategy', 'D. A production schedule'], correctAnswer: 'A', explanation: 'A contingency plan addresses unexpected events or crises.', module: 'Market' },
  { id: 18, question: 'What are the 4Cs of marketing?', type: 'multiple_choice', options: ['A. Customer Value, Cost, Convenience, Communication', 'B. Cash, Credit, Check, Crypto', 'C. Create, Capture, Convert, Close', 'D. Consumer, Company, Competition, Climate'], correctAnswer: 'A', explanation: 'The 4Cs are Customer Value, Cost, Convenience, Communication.', module: 'Marketing' },
  { id: 19, question: 'What is market mapping?', type: 'multiple_choice', options: ['A. Visual representation of market players', 'B. A type of map for farms', 'C. GPS for delivery', 'D. A pricing tool'], correctAnswer: 'A', explanation: 'Market mapping is a visual representation of market players.', module: 'Market' },
  { id: 20, question: 'What is the law of supply?', type: 'multiple_choice', options: ['A. Higher price = Higher supply', 'B. Higher price = Lower supply', 'C. Price does not affect supply', 'D. Lower price = Higher supply'], correctAnswer: 'A', explanation: 'The law of supply states that higher prices lead to higher supply.', module: 'Market' },
  // True or False
  { id: 21, question: 'Agroentrepreneurship only focuses on maximizing profit.', type: 'true_false', correctAnswer: 'False', explanation: 'The primary goal is ensuring sustainable practices, not merely maximizing profit.', module: 'Introduction' },
  { id: 22, question: 'Supply chain is the movement of products from producers to consumers.', type: 'true_false', correctAnswer: 'True', explanation: 'This is the correct definition of supply chain.', module: 'Market' },
  { id: 23, question: 'Record keeping is not important in farm management.', type: 'true_false', correctAnswer: 'False', explanation: 'Record keeping is fundamental for decision-making and compliance.', module: 'Production' },
  { id: 24, question: 'PPE stands for Personal Protective Equipment.', type: 'true_false', correctAnswer: 'True', explanation: 'PPE is Personal Protective Equipment used for safety.', module: 'Safety' },
  { id: 25, question: 'IPM focuses on maximizing pesticide use.', type: 'true_false', correctAnswer: 'False', explanation: 'IPM focuses on biological control methods, not maximizing pesticides.', module: 'Production' },
  { id: 26, question: 'SMART objectives must be Specific, Measurable, Achievable, Relevant, and Time-bound.', type: 'true_false', correctAnswer: 'True', explanation: 'This is the correct definition of SMART objectives.', module: 'Marketing' },
  { id: 27, question: 'Financial management involves managing cash flow effectively.', type: 'true_false', correctAnswer: 'True', explanation: 'Cash flow management is a primary focus of financial management.', module: 'Finance' },
  { id: 28, question: 'Wholesalers sell products directly to consumers.', type: 'true_false', correctAnswer: 'False', explanation: 'Wholesalers sell in bulk to retailers, not directly to consumers.', module: 'Market' },
  { id: 29, question: 'Growth rate describes the rate of change in a metric over time.', type: 'true_false', correctAnswer: 'True', explanation: 'Growth rate measures change over time as a percentage.', module: 'Production' },
  { id: 30, question: 'Organic farming uses synthetic chemicals and pesticides.', type: 'true_false', correctAnswer: 'False', explanation: 'Organic farming avoids synthetic inputs.', module: 'Production' },
  // Identification
  { id: 31, question: 'What is the formula: Gross Profit / Sales?', type: 'identification', correctAnswer: 'Gross Profit Margin', explanation: 'Gross Profit Margin is expressed as a percentage.', module: 'Finance' },
  { id: 32, question: 'What type of budget summarizes ALL expenses and returns of the entire farm?', type: 'identification', correctAnswer: 'Complete Budget', explanation: 'A Complete Budget reflects the performance of the entire farm.', module: 'Finance' },
  { id: 33, question: 'What type of budget considers ONLY items affected by changes?', type: 'identification', correctAnswer: 'Partial Budget', explanation: 'Partial Budgeting helps determine which alternative is better.', module: 'Finance' },
  { id: 34, question: 'What does Gross Margin equal? (Total Revenue - ?)', type: 'identification', correctAnswer: 'Variable Costs', explanation: 'Gross Margin = Total Revenue - Variable Costs.', module: 'Finance' },
  { id: 35, question: 'What is a statistical measure summarizing the likelihood of different outcomes for plants?', type: 'identification', correctAnswer: 'Survival Rate', explanation: 'Survival rate measures plant outcomes at a point in time.', module: 'Production' },
  { id: 36, question: 'What is the process of removing unwanted substances from a product?', type: 'identification', correctAnswer: 'Cleaning', explanation: 'Cleaning is a value-adding activity.', module: 'Market' },
  { id: 37, question: 'What is arranging items systematically by some criterion?', type: 'identification', correctAnswer: 'Sorting', explanation: 'Sorting is a value-adding activity.', module: 'Market' },
  { id: 38, question: 'What is the UC code for "Assess Market Opportunities"?', type: 'identification', correctAnswer: 'AFF243301', explanation: 'AFF243301 is the code for Assess Market Opportunities.', module: 'Introduction' },
  { id: 39, question: 'What is the UC code for "Handle Finances"?', type: 'identification', correctAnswer: 'AFF243303', explanation: 'AFF243303 is the code for Handle Finances.', module: 'Introduction' },
  { id: 40, question: 'What is the movement of humans, animals, and goods from one location to another?', type: 'identification', correctAnswer: 'Transporting', explanation: 'Transporting is a value-adding activity.', module: 'Market' }
];

// Additional quiz questions (more challenging)
export const additionalQuestions: QuizQuestion[] = [
  { id: 101, question: 'Name the 4Ps of Marketing.', type: 'enumeration', correctAnswer: ['Product', 'Price', 'Place', 'Promotion'], explanation: 'The 4Ps are Product, Price, Place, and Promotion.', module: 'Marketing' },
  { id: 102, question: 'Name the 4Cs of Marketing.', type: 'enumeration', correctAnswer: ['Customer Value', 'Cost', 'Convenience', 'Communication'], explanation: 'The 4Cs are Customer Value, Cost, Convenience, and Communication.', module: 'Marketing' },
  { id: 103, question: 'List the 3 types of manufacturers.', type: 'enumeration', correctAnswer: ['Made to Stock', 'Made to Order', 'Made to Assemble'], explanation: 'MTS, MTO, and MTA are the three types.', module: 'Marketing' },
  { id: 104, question: 'Name the 6 segmental choice criteria used by companies when buying products from suppliers.', type: 'enumeration', correctAnswer: ['Quality', 'Price and Life Cycle Costs', 'Continuity of Supply', 'Perceived Risk', 'Personal Likes and Dislikes', 'Implications for Marketers'], explanation: 'These are the 6 criteria buyers use to evaluate suppliers.', module: 'Marketing' },
  { id: 105, question: 'List 3 sources of price information.', type: 'enumeration', correctAnswer: ['Farm gate', 'Trading centers', 'Local market pricing'], explanation: 'Sources include farm gate prices, trading centers, and local market pricing.', module: 'Marketing' },
  { id: 106, question: 'Name the 3 kinds of buyers by spending behavior.', type: 'enumeration', correctAnswer: ['Tightwads', 'Spendthrifts', 'Average Spenders'], explanation: 'The three types are Tightwads, Spendthrifts, and Average Spenders.', module: 'Market' },
  { id: 107, question: 'List the 4 components of self-regulation.', type: 'enumeration', correctAnswer: ['Standards', 'Motivation', 'Monitoring', 'Willpower'], explanation: 'The four components are Standards, Motivation, Monitoring, and Willpower.', module: 'Safety' },
  { id: 108, question: 'Name Stephen Covey\'s first 3 Habits of Highly Effective People.', type: 'enumeration', correctAnswer: ['Be proactive', 'Begin with the end in mind', 'First things first'], explanation: 'Habits 1-3 are about moving from dependence to independence.', module: 'Safety' },
  { id: 109, question: 'List the 4 core competencies of Agroentrepreneurship NC II.', type: 'enumeration', correctAnswer: ['Assess Market Opportunities', 'Establish Farm Production Plan', 'Handle Finances', 'Market Produce'], explanation: 'These are the 4 core competency units.', module: 'Introduction' },
  { id: 110, question: 'Name the 4 types of market segmentation.', type: 'enumeration', correctAnswer: ['Demographic', 'Psychographic', 'Geographic', 'Behavioral'], explanation: 'The 4 types are Demographic, Psychographic, Geographic, and Behavioral.', module: 'Market' }
];

// Flashcards for memorization
export const flashcards: Flashcard[] = [
  { id: 1, term: 'Agroentrepreneurship', definition: 'The combination of agriculture and entrepreneurship principles to create sustainable farm businesses.', category: 'Introduction' },
  { id: 2, term: 'Supply Chain', definition: 'The movement of products from producers to consumers through various intermediaries.', category: 'Market' },
  { id: 3, term: 'Value Chain', definition: 'Activities that add value to products as they move from raw materials to finished goods.', category: 'Market' },
  { id: 4, term: 'Value-Adding Activities', definition: 'Processes that increase the value of a product or service to the customer.', category: 'Market' },
  { id: 5, term: 'SMART Objectives', definition: 'Specific, Measurable, Achievable, Relevant, Time-bound goals.', category: 'Marketing' },
  { id: 6, term: '4Ps of Marketing', definition: 'Product, Price, Place, Promotion — the marketing mix from the producer view.', category: 'Marketing' },
  { id: 7, term: '4Cs of Marketing', definition: 'Customer Value, Cost, Convenience, Communication — the consumer-centric view.', category: 'Marketing' },
  { id: 8, term: 'Gross Profit', definition: 'Sales minus Cost of Goods Sold.', category: 'Finance' },
  { id: 9, term: 'Gross Profit Margin', definition: 'Gross Profit divided by Sales, expressed as a percentage.', category: 'Finance' },
  { id: 10, term: 'Complete Budget', definition: 'A budget summarizing ALL expenses and returns for the entire farm.', category: 'Finance' },
  { id: 11, term: 'Partial Budget', definition: 'A budget considering ONLY items affected by a proposed change.', category: 'Finance' },
  { id: 12, term: 'PPE', definition: 'Personal Protective Equipment used for safety in farm operations.', category: 'Safety' },
  { id: 13, term: 'IPM', definition: 'Integrated Pest Management — focuses on biological control methods.', category: 'Production' },
  { id: 14, term: 'Contingency Plan', definition: 'A plan for unexpected events or crises affecting the business.', category: 'Market' },
  { id: 15, term: 'Market Mapping', definition: 'Visual representation of market players and product flow.', category: 'Market' },
  { id: 16, term: 'Supply', definition: 'The quantity of goods producers are willing to produce and sell.', category: 'Market' },
  { id: 17, term: 'Demand', definition: 'The quantity of goods consumers are willing to buy.', category: 'Market' },
  { id: 18, term: 'Growth Rate', definition: 'Rate of change in a metric over time, expressed as a percentage.', category: 'Production' },
  { id: 19, term: 'Survival Rate', definition: 'Statistical measure of plant outcomes at a specific point in time.', category: 'Production' },
  { id: 20, term: 'Self-Regulation', definition: 'Ability to pause before acting on a feeling; promotes goal focus.', category: 'Workplace' }
];

// Key terms for the memorization game
export const keyTermsGame = [
  { term: 'Agroentrepreneurship', match: 'Agri + Entrepreneurship' },
  { term: 'Supply Chain', match: 'Producer to Consumer flow' },
  { term: 'Value Chain', match: 'Adding value activities' },
  { term: '4Ps', match: 'Product Price Place Promotion' },
  { term: '4Cs', match: 'Customer Cost Convenience Communication' },
  { term: 'SMART', match: 'Specific Measurable Achievable Relevant Time-bound' },
  { term: 'Gross Profit', match: 'Sales minus COGS' },
  { term: 'PPE', match: 'Personal Protective Equipment' },
  { term: 'IPM', match: 'Integrated Pest Management' },
  { term: 'BDSP', match: 'Business Development Service Provider' },
  { term: 'Contingency Plan', match: 'Plan for unexpected events' },
  { term: 'Farm Gate', match: 'Price at the farm level' },
  { term: 'Cash Flow', match: 'Money movement in/out' },
  { term: 'Record Keeping', match: 'Farm data documentation' },
  { term: 'SWOT', match: 'Strengths Weaknesses Opportunities Threats' }
];
