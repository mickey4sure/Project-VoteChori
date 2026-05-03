import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const faqs = [
  { question: "What is an EVM?", answer: "An Electronic Voting Machine (EVM) is a device used to record votes electronically, replacing the traditional paper ballot system.", category: "Voting Tech", isCommon: true },
  { question: "How does VVPAT work?", answer: "Voter Verifiable Paper Audit Trail (VVPAT) prints a slip showing the serial number, name, and symbol of the candidate you voted for. It is visible through a glass window for 7 seconds.", category: "Voting Tech", isCommon: true },
  { question: "Can EVMs be hacked?", answer: "No. Indian EVMs are standalone, non-networked machines that do not connect to the internet, Bluetooth, or Wi-Fi, making them highly resistant to remote hacking.", category: "Security", isCommon: true },
  { question: "What happens if an EVM breaks down?", answer: "If an EVM malfunctions during the poll, it is immediately replaced with a reserve EVM by the Presiding Officer in the presence of polling agents.", category: "Voting Tech", isCommon: false },
  { question: "Who can vote in Indian elections?", answer: "Any Indian citizen aged 18 or above, whose name is enrolled in the electoral roll, has the right to vote.", category: "Voter Rights", isCommon: true },
  { question: "Do I need an EPIC card to vote?", answer: "While the Electoral Photo Identity Card (EPIC) is preferred, you can use other approved photo identity documents (like Aadhaar, Passport, Driving License) if your name is on the voter list.", category: "Voter Rights", isCommon: true },
  { question: "What is the Model Code of Conduct?", answer: "It is a set of guidelines issued by the Election Commission of India for candidates and political parties during elections to ensure free and fair polling.", category: "Electoral Process", isCommon: false },
  { question: "How is the Election Commission formed?", answer: "The President of India appoints the Chief Election Commissioner and other Election Commissioners based on the recommendations of a selection committee.", category: "Electoral Process", isCommon: false },
  { question: "What is the NOTA option?", answer: "None of the Above (NOTA) allows voters to officially register a vote of rejection for all candidates contesting in the election.", category: "Voter Rights", isCommon: true },
  { question: "When are the counting of votes done?", answer: "Votes are counted under the supervision of the Returning Officer and in the presence of candidates and their agents after the final phase of voting is complete.", category: "Electoral Process", isCommon: false },
  { question: "How are constituencies drawn?", answer: "Constituencies are delimited by the Delimitation Commission based on recent census data to ensure equal representation.", category: "Electoral Process", isCommon: false },
  { question: "Can a person vote from anywhere?", answer: "No, a person must vote at the polling station corresponding to the constituency where they are registered.", category: "Voter Rights", isCommon: false },
  { question: "What is a Proxy Vote?", answer: "Proxy voting allows registered service voters (like armed forces) to appoint someone to vote on their behalf.", category: "Voter Rights", isCommon: false },
  { question: "Are political parties funded by the government?", answer: "No, political parties rely on private donations and electoral bonds, though the state may provide some indirect subsidies.", category: "Electoral Process", isCommon: false },
  { question: "What happens in case of a tie?", answer: "In the rare event of a tie, the Returning Officer determines the result by drawing lots.", category: "Electoral Process", isCommon: false },
  { question: "Is voter registration automatic at 18?", answer: "No, eligible citizens must actively apply for inclusion in the electoral roll by filling out Form 6.", category: "Voter Rights", isCommon: false },
  { question: "How does the AI Fact-Checker work?", answer: "ChoriGuard AI cross-references incoming claims with verified databases and official Election Commission guidelines to instantly classify statements as Verified, Fake, or Context Needed.", category: "Security", isCommon: true },
  { question: "What is a Returning Officer?", answer: "The Returning Officer is responsible for overseeing the election in a constituency, including accepting nominations, conducting polls, and declaring results.", category: "Electoral Process", isCommon: false }
];

async function main() {
  console.log("Seeding FAQs...");
  for (const faq of faqs) {
    await prisma.faq.upsert({
      where: { question: faq.question },
      update: { answer: faq.answer, category: faq.category, isCommon: faq.isCommon },
      create: { question: faq.question, answer: faq.answer, category: faq.category, isCommon: faq.isCommon }
    });
  }
  console.log("FAQ seeding completed successfully.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
