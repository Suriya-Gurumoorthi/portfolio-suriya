export const projectsData = [
    {
        id: 1,
        name: 'Union Budget 2025-26 Dashboard',
        description: "Built a comprehensive Union Budget dashboard in Tableau, visualizing 5.06T allocation across 56 sectors. Analyzed tax reform impacts, revealing savings up to 15% for middle-income earners. Designed with user-focused approach, ensuring easy interpretability by all stakeholders. The dashboard provides interactive visualizations for budget allocation, sector-wise analysis, and tax impact assessments.",
        tools: ['Tableau','Excel'],
        role: 'Data Analysis',
        code: '',
        demo: '',
    },
    {
        id: 2,
        name: 'Trip Itinerary Generator',
        description: 'Developed an interactive web application that personalizes daily travel plans based on user inputs including destination, duration, transportation mode, budget, and food preferences. Integrated Gemini Pro API for advanced natural language understanding and dynamic trip planning. Incorporated real-time weather forecasts, currency exchange rates, and flight fare estimation using prompt engineering techniques. The app generates comprehensive, day-by-day itineraries tailored to individual traveler needs.',
        tools: ['Python', 'Streamlit', 'Gemini Pro API', 'OpenWeatherMap API', 'Prompt Engineering'],
        role: 'End to End Generative AI Project',
        code: 'https://github.com/Suriya-Gurumoorthi/trip-advisor-llm',
        demo: '',
    },
    {
        id: 3,
        name: 'Credit Risk Classification',
        description: 'Implemented a complete credit risk prediction pipeline including data cleaning, transformation, and feature scaling. Performed comprehensive hyperparameter tuning across multiple machine learning models (Naive Bayes, Random Forest, Logistic Regression, etc.) to optimize performance. Achieved 73% precision with Naive Bayes, identifying it as the best-performing model. Built an interactive Streamlit web application for real-time credit risk assessment, deployed for public access.',
        tools: ['Python', 'Machine Learning', 'Scikit-learn', 'Streamlit'],
        code: 'https://github.com/Suriya-Gurumoorthi/credit_risk_prediction',
        role: 'End to End Machine Learning Project',
        demo: 'https://german-credit-risk-prediction.streamlit.app',
    },
    {
        id: 4,
        name: 'LLM Chatbot using OpenAI & Pinecone',
        description: "Built an intelligent chatbot using university dataset with Retrieval-Augmented Generation (RAG) architecture. Integrated GPT-3.5 with LangChain for dynamic prompt design and context-aware response generation. Used Pinecone vector database to manage 250-dimensional embeddings, enabling accurate semantic retrieval and relevant context extraction. The system provides accurate, contextually relevant answers by combining large language models with domain-specific knowledge retrieval.",
        tools: ['Python', 'OpenAI API', 'LangChain', 'Pinecone', 'RAG', 'Vector Embeddings', 'NLP'],
        code: '',
        demo: '',
        role: 'AI Engineer',
    }
];


// Do not remove any property.
// Leave it blank instead as shown below

// {
//     id: 1,
//     name: '',
//     description: "",
//     tools: [],
//     role: '',
//     code: '',
//     demo: '',
// },