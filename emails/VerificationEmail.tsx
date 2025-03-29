import {
  Html,
  Head,
  Text,
  Preview,
  Section,
  Font,
  Row,
  Heading,
} from "@react-email/components";

interface VerificationEmailProps {
  username: string;
  otp: string;
}

export default function VerificationEmail({
  username,
  otp,
}: VerificationEmailProps) {
  return (
    <Html lang="en" dir="ltr">
      <Head>
        <title>Verification Code</title>
        <Font
          fontFamily="Roboto"
          fallbackFontFamily="Verdana"
          webFont={{
            url: "https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap",
            format: "woff",
          }}
          fontWeight={400}
          fontStyle="normal"
        />
      </Head>
      <Preview>Here &apos;s your verification code {otp}</Preview>
      <Section>
        <Row>
          <Heading as="h2">Hello {username}</Heading>
        </Row>
        <Row>
            <Text>
                Thank you for Registering with us.
                please use the following verification code to verify your account.
            </Text>
        </Row>
        <Row>
            <Text>
                Verification Code: {otp}
            </Text>
        </Row>
        <Row>
            <Text>
                If you did not request this verification code, please ignore this email.
            </Text>
        </Row>
      </Section>
    </Html>
  );
}
