BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[chatLog] ADD [idChat] BIGINT;

-- AlterTable
ALTER TABLE [dbo].[usuario] DROP CONSTRAINT [usuario_administrador_df];
ALTER TABLE [dbo].[usuario] ADD CONSTRAINT [usuario_administrador_df] DEFAULT 0 FOR [administrador];

-- AddForeignKey
ALTER TABLE [dbo].[chatLog] ADD CONSTRAINT [chatLog_idChat_fkey] FOREIGN KEY ([idChat]) REFERENCES [dbo].[chat]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
