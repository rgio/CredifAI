-- AlterTable
ALTER TABLE "posts" ADD COLUMN     "color" TEXT,
ADD COLUMN     "credentialId" TEXT,
ADD COLUMN     "documentId" TEXT,
ADD COLUMN     "num_comments" INTEGER NOT NULL DEFAULT 0;

-- AddForeignKey
ALTER TABLE "posts" ADD CONSTRAINT "posts_credentialId_fkey" FOREIGN KEY ("credentialId") REFERENCES "credentials"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "posts" ADD CONSTRAINT "posts_documentId_fkey" FOREIGN KEY ("documentId") REFERENCES "documents"("id") ON DELETE SET NULL ON UPDATE CASCADE;
