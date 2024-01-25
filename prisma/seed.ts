// import { PrismaClient, Prisma } from '@prisma/client'

// const prisma = new PrismaClient()

// const userData: Prisma.UserCreateInput[] = [
//   {
//     name: 'Ankit',
//     email: 'ankit@truedot.ai',
//     posts: {
//       create: [
//         {
//           title: 'Adoption of Decentralized Technologies',
//           color: '#29E7CD',
//           content: 'A significant majority of Web3 developers (78%) report a growing interest in decentralized technologies, with a particular focus on blockchain and decentralized finance (DeFi) applications. This trend is driven by a desire for more secure, transparent, and efficient systems, as well as the burgeoning market opportunities in these areas.',
//           published: true,
//         },
//       ],
//     },
//   },
//   {
//     name: 'Teja',
//     email: 'teja@truedot.ai',
//     posts: {
//       create: [
//         {
//           title: 'Challenges in Scalability and Performance',
//           color: '#BD4CA5',
//           content: 'Scalability and performance issues are the top challenges faced by 65% of Web3 developers. These challenges stem from the limitations of current blockchain infrastructures and the complexity of developing scalable decentralized applications (dApps) that can handle high transaction volumes without compromising on speed or security.',
//           published: true,
//         },
//       ],
//     },
//   },
//   {
//     name: 'Nilu',
//     email: 'nilu@truedot.ai',
//     posts: {
//       create: [
//         {
//           title: 'Shift Towards Interoperability',
//           color: '#3993DD',
//           content: 'About 59% of developers emphasize the importance of interoperability between different blockchain platforms. There is a growing recognition that enabling communication and data exchange across various blockchain networks is crucial for the broader adoption and functionality of Web3 applications.',
//           published: true,
//         },
//       ],
//     },
//   },
//   {
//     name: 'Mahmoud',
//     email: 'mahmoud@truedot.ai',
//     posts: {
//       create: [
//         {
//           title: 'Demand for Enhanced Security Measures',
//           color: '#F7AA2F',
//           content: 'With increasing incidents of security breaches and smart contract vulnerabilities, 72% of Web3 developers prioritize enhancing security measures in their projects. Developers are adopting more rigorous testing methods, code audits, and innovative security protocols to safeguard against potential threats.',
//           published: true,
//         },
//       ],
//     },
//   },
//   {
//     name: 'Rob',
//     email: 'rob@truedot.ai',
//     posts: {
//       create: [
//         {
//           title: 'Trends in Decentralized Identity (DID)',
//           color: '#a30b1b',
//           content: 'Decentralized identity solutions are gaining traction, with 54% of developers actively exploring or implementing DID systems. These systems are seen as a key enabler for privacy-preserving and user-centric identity management in the Web3 space, offering users control over their digital identities.ity breaches and smart contract vulnerabilities, 72% of Web3 developers prioritize enhancing security measures in their projects. Developers are adopting more rigorous testing methods, code audits, and innovative security protocols to safeguard against potential threats.',
//           published: true,
//         },
//       ],
//     },
//   },
// ]

// const credentialData: Prisma.CredentialCreateInput[] = [
//   {
//     name: 'GitHub',
//     imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSevjLMoY69RrmdOeKZONLsRySpvdkEwP-SaraZ3hc_8WFS0eR1ALIIL9xuP2_nWbRnawY&usqp=CAU',
//   },
//   {
//     name: 'Email',
//     imageUrl: 'data:image/png;base64,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'
//   },
//   {
//     name: 'Marketing Director @Target',
//     imageUrl: 'data:image/png;base64,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'
//   },
//   {
//     name: 'AI Researcher @Google',
//     imageUrl: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAABUFBMVEX////qQzU0qFNChfT7vAUufPPg6P06gfSIrfc1f/T7uQCxyPr/vQD619X7twDqPzDpKhMtpk7pNybpNCIToUAjpEjpMB3pOyz8wgDj8eYeo0VDg/vZ7N3pMiD1s6/pPDb/+/H8x0j8zmZJr2PC4cnympX0rKfrU0f4yMX3wb6ZzqXs8v72+f6Aw5AzqkBqun374eD2ubXucmn98fDzop3tZFvwiIHsWk/wgnv803f92Y3+8NL95LH94af93p38ylT+9uL+6cBWkPX+6LvH2Ptwn/ajv/nsuhHU4fxgt3W02ryUzKHrSz7veHDsWEzxkYroHQD4uHXsUTHvbyn0kB74qhHtXy7ygST4rBDwdDv7wzT81oG4zvqJtVjjuRiDqfe6tC2DrkBNqk6UsDuvszFhq0nKtibSy3hil/U9j8o6mqA2onU/jNk8lbU4n4lBieba6nVfAAAKcUlEQVR4nO2c6X/aRhrHhQwhdgAd6AgquG4B2+BisDnsJNvLTbMF2/G23W7vdu9Nt9vd///dSgIDkpnRMyPNjODD943fIX0zz8xvLkWStmzZsmXLli1bEqLfK7bODgfNKYPDs9Zxry/6pZKhdzwYDW8s1aqVy7qLbdveH71csyxVubhsnhXX17S4PzqqWWXdVjIoFFfXspTzwfHaaRYHQ9XCuQVF9ZqaGbXWxrK/f25ZOlBugV1Wj5pF0S8fTW9wpOo2qd19W9qWfnksWgFH/9DVI268UFPWrFFaW/L4PLbeTNK6OUxfn+wPlBptcT5E0a3LnmilAL2RqiemN8VWh+npkcVzNbnmW6BYRy3Raj69IRO/maP4duydq4mMLkjHC7EDa3/ErP3mjuqtwHH10GLt52GrA0F+xZsyBz8PPSOkVC+ZdsAginrJ3e+YevJJh21zHlVvVa5+HuqIo19R4duAU/QbbhO5JsceuIyi7nPx6w95DaEPsXgMOEVbRIXeo79mHv/7/IeYAIrOuDPeCRZ0UZkuOM7FdcEFDCdx/dciu+AC646VYCYdgpnMH9j0xV4y20wJoLKZh/fKmy5obbygaLF7GAn2N70P9qGHSMxhJChlNl3wIi05yErwNukNe1pYCTZros1msBJsiV9NTGEl2Nt0wQSHUWV6z8S/dGITxw8zwfMkhlHF1i3Vuri9ax7un7XO9g8Hd5dDXbXK8HkEM8HD+JM1u6zejPZXXQvqtZrDGuzSBjPB2J1QtzIj/GUg7+JNpCQzQekmVie0LaUJWar2z4b4M3J2gndxol5XL+Ev1h/YNeS/JjvBYowaLdsDwo3N1hFiBcpOMEaNlm2a7ffjo1WzJ4aCTdoa1cuHlI9sKQ+eyVCQdhxV1Dh7feFDH4aC0pCuRmsX8Xb6eq+XN51ZCraosl5RaQt0wWDRjCwFJaoW1I+SOBnq3Z+/MhUc0AwzsXrgMtMTSqaCfYoaVRI8FPKOuJgKSnfkSwrFTvIwYV9lK9gnTwo7kS64oMX2jtDn9tuEgvqQ6QslzcFe6QsyRf1c9DuT8Wwv+/RLEsV1EzwoZbPZp3+EK9rrVaKS9Hwv6yl+lQE62hei35gUX9DjTyBFJSP6hUl5f2749GuIopW+TyMi+C475+lXb0c6quLvmhPyopRdUoyMjZqoG8r0PNvLLhMRG2s3jLqUskHwsVFbu04o/W4vG1b8Bh0b69cJJemdsCAuNuxb0a9LzkG4SLGxUV6/Gl0Kw6Diytio8bmUnCwrixQRG8qR6LelYHWRImKD7SqcEQ9H0iXFUGwoaxiFkvQuxjAcG2q6PmMFghP0WIoNZc1WvVNeoLvhrBkXsWGtYy+UPohqw0VsKK9FvywVH0YJLmKjlo6PkEmJKtKpox8buuh3peIjkKEfG3ZT9MtSgUvDgOI3X1hrGRXhxS+Ob0W/Kx3fRZvN2HtO/ZCTR4w5wTwc3oSlF9SGT3KM+RT9bOBA40MtKD3Z3WEM+tkfgw33nqXYMPce8tnRM5q54SdpNnyEfDZ8KC0dpNhw9yXy2aj1/QroBTkYPkE+G+y3926aDfOPkc+Gd8MPUm2IjAvMHk2I0sepNrxCPRoeh6WP0myIDsTIBf6iSmMIcjDcRT36E/ikLd2GyMiHrp2y2XdSboiKfPCUJlZYiDR8Djb8PuWGn8U2jBOHPEYa1LRtcwx/iG34/tZQsCFq6r01XBimvR9uDaMNU56HSMONmdMgx9KNmZciDTdmbYE03Jz1IWrWtjFrfOTMe1P2aTBbwhuy17aTQ54+QQVTvl+KObjYkD1v9E7UppxbYI7XNuTsCb0jvCnnh+hd/U05A8aczHA6x2duiD5d43MXQ+QJqfQ9tBEL2R/pDXN5KsCGmFNu8Pqp8JNsVGgNX/78mAqwIuamAnSoKfxZls02rSEl7+Wghnncz0AMC4W/yC4aL7UZL6HdFxMWEuh+aeH3f/UEZafBy20KuErzr3A/Ez2rKfxTnqKNeblNuYIWKXKF7xO1zC8U/ibfY1R5yXmcgLshbiiVojK/kP3HXFDWupzkfOApil5Z+GC/t3BDYhn6wKDgDVRw5w3+h3CJWPh7QJBrI8KLFD/Q4PZqZiERaER+PfEVPO8xczYf1Dr/PiQCjVjnYucBrlHsjMYH8f3hPCQCOBMuem7cg4t0B738nbGyTJdDItiKPPRcrsBFGtUNpZVlGgiJAGaHgx5REyJ3gxc8HE1DISFgsIE34U4O8HPhMg2HBP86/QHehPmfAb8X3FNcERJBQw6hCG/BiEnpjMDcdFVIBGE/nsLXvoCs8FnarVkdEny74mfwGo1YG85ZRCIqJIKYbA3hfsAileYLDHRIBGE7tfmUoEaBRXp/KQMXEiFFhovhVwQ1ChtJPfx5DT4kQnXKbEAlyPodwKx7zrO9qJAIKzKa2zwiEsR90xXioBQZElwUT8i2xwFz0jn/0sgE2RTqyQ7JKAMfZzwqBqmhbCY+3JyQ+cHHGZ8OcSPKmpzsvs0j0hOciE22EBSNKGtmkrMbgun2jIgtqDDXJrmibCR3mPGYWBAeFTNoDGUnoc548ob4kBFzeo9g4tAoamYSxxkvc4SDDE0TSlKdfLDxMLpxB5zK2PjlLWJD4iaUpCrFYOM3Y8ze2HY0+fTfpIqA/ZmHdKi6oosp05dqQ/afevorYdoTDqQz6MrUw6nTOTbq971fk/9D0oxkWbh4HmWd+o4y+e7GRF4e3U5/gyuSTWeWoK5TD9O8Jhlzqh0n9LTT/4IvYJDMSIPEEPQcjfoEJllty8bDPmHW/wdrxhzmjlDUk2PUqYfmSrYj5nKVRkc2VheL5sBigyIp5rSpcj8o6TjjdmNlW1Ya7a5rhxnRQLGBvhMMYUw/oC5bmoYhdzvtSWPKZHLdcd0MB2c3VYyOjV2Che8qkjCcebqiptuijuP91YA/HB0bcWrUI25XjE9EbMSrUY+JeEVcbOSAm8A4YqViImBigzrrA4yFK2qniNjIwzcQsVAupJIEERvxO+EMWbyisyo2KJa9CCrC69QLmwexkYuZhAHF2HObBAjHxm4io8xcUXhmyF5sLFdqnm7Vi0R88svB2CDfXIsiFYW6iI38FfWaEK0YOU3mwSw28jvJC7qK0NkyU5xfr/KMBKVURL+3FvvlLQYlOkP8BM7j9Ddmgu40PAVDavJHlQHEL6Yc1hciq4KH1ASP8JDUBXZGzeDyrc61sEo165w+gagKSkaDz51kn66AZtQMXjfnfRrcBxxnzPMjHQ++0ci5AadUZX6DKv8GnOKdSPPA1Dh/z7lEZ8WpWNJoxrUwP5dKl7GjZnTEFOiC6pihoxb/9koSVFm1o+vH9VtcDJUO4hg3Dqb4+gzQ1hIdWDVH5v2fGkTT6CbVkJppdMXlA47KpI49lofq1QXMX8BU2rEkXb0x8IqKQCqTrhN9B2GlndZJZ3GuoNoeezctoJqa6RhmJ/2NF6I66dS9ixc4T++ChmPIXcSNm3Wg0mh3xt7VGf+OyRKO4xiOPO60G2kJ9XhUKtXGZNJuX3u0297doerattqWLVu2bNmyJX38H0BKn4PAfcwcAAAAAElFTkSuQmCC',
//   }
// ]


// async function main() {
//   console.log(`Start seeding ...`)
//   for (const u of userData) {
//     const user = await prisma.user.create({
//       data: u,
//     })
//     console.log(`Created user with id: ${user.id}`)
//   }
//   for (const c of credentialData) {
//     const credential = await prisma.credential.create({
//       data: c,
//     })
//     console.log(`Created credential with id: ${credential.id}`)
//   }
//   console.log(`Seeding finished.`)
// }

// main()
//   .catch((e) => {
//     console.error(e)
//     process.exit(1)
//   })
//   .finally(async () => {
//     await prisma.$disconnect()
//   })
export {}
