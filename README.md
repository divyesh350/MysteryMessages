# Mystery Message - AI-Powered Message Generation Platform

A Next.js application that allows users to generate personalized messages using AI, with features for user authentication, message management, and email notifications.

## Features

- 🔐 User Authentication with NextAuth.js
- 🤖 AI-powered message generation using OpenAI
- 📧 Email notifications using Resend
- 📱 Responsive UI with Tailwind CSS
- 🔍 Form validation using Zod
- 🎨 Modern UI components with Radix UI
- 📊 MongoDB database integration
- 🔄 Real-time updates with React Hook Form

## Tech Stack

- **Framework**: Next.js 15.2.2
- **Language**: TypeScript
- **Database**: MongoDB
- **Authentication**: NextAuth.js
- **AI Integration**: OpenAI API
- **Email Service**: Resend
- **UI Components**: 
  - Radix UI
  - Tailwind CSS
  - Lucide React Icons
- **Form Handling**: React Hook Form with Zod validation
- **State Management**: React Context API

## Prerequisites

- Node.js (v18 or higher)
- MongoDB database
- OpenAI API key
- Resend API key

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
MONGODB_URI="your_mongodb_connection_string"
RESEND_API_KEY="your_resend_api_key"
NEXTAUTH_SECRET="your_nextauth_secret"
OPENAI_API_KEY="your_openai_api_key"
```

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/mysterymessage.git
cd mysterymessage
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables as mentioned above.

4. Run the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:3000`

## Project Structure

```
mysterymessage/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   ├── auth/              # Authentication pages
│   └── dashboard/         # Dashboard pages
├── components/            # Reusable UI components
├── context/              # React Context providers
├── emails/               # Email templates
├── helpers/              # Utility functions
├── lib/                  # Library configurations
├── middleware/           # Next.js middleware
├── models/               # MongoDB models
├── public/              # Static assets
├── schemas/             # Zod validation schemas
└── types/               # TypeScript type definitions
```

## API Routes

- `/api/auth/*` - Authentication endpoints (NextAuth.js)
- `/api/messages` - Message management endpoints
- `/api/ai` - AI integration endpoints
- `/api/email` - Email notification endpoints

## Pages

- `/` - Home page
- `/auth/*` - Authentication pages (login, register)
- `/dashboard` - User dashboard
- `/messages` - Message management
- `/settings` - User settings

## Schema Validation

The project uses Zod for schema validation, particularly in:
- User registration and login forms
- Message creation and editing
- API request validation

## Security Features

- Password hashing with bcryptjs
- JWT-based authentication
- Protected API routes
- Environment variable protection
- Input validation and sanitization

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Next.js team for the amazing framework
- OpenAI for the AI capabilities
- Resend for email services
- All contributors and maintainers of the used packages
