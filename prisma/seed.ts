import { PrismaClient, Prisma } from '@prisma/client'

const prisma = new PrismaClient()

const userData: Prisma.UserCreateInput[] = [
  {
    name: 'Ankit',
    email: 'ankit@truedot.ai',
    posts: {
      create: [
        {
          title: 'Adoption of Decentralized Technologies',
          content: 'A significant majority of Web3 developers (78%) report a growing interest in decentralized technologies, with a particular focus on blockchain and decentralized finance (DeFi) applications. This trend is driven by a desire for more secure, transparent, and efficient systems, as well as the burgeoning market opportunities in these areas.',
          published: true,
        },
      ],
    },
  },
  {
    name: 'Teja',
    email: 'teja@truedot.ai',
    posts: {
      create: [
        {
          title: 'Challenges in Scalability and Performance',
          content: 'Scalability and performance issues are the top challenges faced by 65% of Web3 developers. These challenges stem from the limitations of current blockchain infrastructures and the complexity of developing scalable decentralized applications (dApps) that can handle high transaction volumes without compromising on speed or security.',
          published: true,
        },
      ],
    },
  },
  {
    name: 'Nilu',
    email: 'nilu@truedot.ai',
    posts: {
      create: [
        {
          title: 'Shift Towards Interoperability',
          content: 'About 59% of developers emphasize the importance of interoperability between different blockchain platforms. There is a growing recognition that enabling communication and data exchange across various blockchain networks is crucial for the broader adoption and functionality of Web3 applications.',
          published: true,
        },
      ],
    },
  },
  {
    name: 'Mahmoud',
    email: 'mahmoud@truedot.ai',
    posts: {
      create: [
        {
          title: 'Demand for Enhanced Security Measures',
          content: 'With increasing incidents of security breaches and smart contract vulnerabilities, 72% of Web3 developers prioritize enhancing security measures in their projects. Developers are adopting more rigorous testing methods, code audits, and innovative security protocols to safeguard against potential threats.',
          published: true,
        },
        {
          title: 'Prisma on YouTube',
          content: 'https://pris.ly/youtube',
        },
      ],
    },
  },
  {
    name: 'Rob',
    email: 'rob@truedot.ai',
    posts: {
      create: [
        {
          title: 'Trends in Decentralized Identity (DID)',
          content: 'Decentralized identity solutions are gaining traction, with 54% of developers actively exploring or implementing DID systems. These systems are seen as a key enabler for privacy-preserving and user-centric identity management in the Web3 space, offering users control over their digital identities.ity breaches and smart contract vulnerabilities, 72% of Web3 developers prioritize enhancing security measures in their projects. Developers are adopting more rigorous testing methods, code audits, and innovative security protocols to safeguard against potential threats.',
          published: true,
        },
        {
          title: 'Prisma on YouTube',
          content: 'https://pris.ly/youtube',
        },
      ],
    },
  },
]

async function main() {
  console.log(`Start seeding ...`)
  for (const u of userData) {
    const user = await prisma.user.create({
      data: u,
    })
    console.log(`Created user with id: ${user.id}`)
  }
  console.log(`Seeding finished.`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
