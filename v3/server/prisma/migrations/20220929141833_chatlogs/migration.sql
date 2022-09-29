/*
  Warnings:

  - You are about to drop the `Mensagem` table. If the table is not empty, all the data it contains will be lost.

*/
BEGIN TRY

BEGIN TRAN;

-- DropForeignKey
ALTER TABLE [dbo].[Mensagem] DROP CONSTRAINT [Mensagem_idChat_fkey];

-- DropForeignKey
ALTER TABLE [dbo].[Mensagem] DROP CONSTRAINT [Mensagem_idCliente_fkey];

-- DropForeignKey
ALTER TABLE [dbo].[Mensagem] DROP CONSTRAINT [Mensagem_idUsuario_fkey];

-- AlterTable
ALTER TABLE [dbo].[usuario] DROP CONSTRAINT [usuario_administrador_df];
ALTER TABLE [dbo].[usuario] ADD CONSTRAINT [usuario_administrador_df] DEFAULT 0 FOR [administrador];

-- DropTable
DROP TABLE [dbo].[Mensagem];

-- CreateTable
CREATE TABLE [dbo].[chatLog] (
    [id] UNIQUEIDENTIFIER NOT NULL CONSTRAINT [chatLog_id_df] DEFAULT NEWID(),
    [acao] TINYINT NOT NULL,
    [data] DATETIME2 NOT NULL CONSTRAINT [chatLog_data_df] DEFAULT CURRENT_TIMESTAMP,
    [idUsuario] BIGINT,
    CONSTRAINT [chatLog_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[mensagem] (
    [id] UNIQUEIDENTIFIER NOT NULL CONSTRAINT [mensagem_id_df] DEFAULT NEWID(),
    [mensagem] VARCHAR(4095) NOT NULL,
    [data] DATETIME2 NOT NULL CONSTRAINT [mensagem_data_df] DEFAULT CURRENT_TIMESTAMP,
    [idChat] BIGINT NOT NULL,
    [idUsuario] BIGINT,
    [idCliente] BIGINT,
    CONSTRAINT [mensagem_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- AddForeignKey
ALTER TABLE [dbo].[chatLog] ADD CONSTRAINT [chatLog_idUsuario_fkey] FOREIGN KEY ([idUsuario]) REFERENCES [dbo].[usuario]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[mensagem] ADD CONSTRAINT [mensagem_idChat_fkey] FOREIGN KEY ([idChat]) REFERENCES [dbo].[chat]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[mensagem] ADD CONSTRAINT [mensagem_idUsuario_fkey] FOREIGN KEY ([idUsuario]) REFERENCES [dbo].[usuario]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[mensagem] ADD CONSTRAINT [mensagem_idCliente_fkey] FOREIGN KEY ([idCliente]) REFERENCES [dbo].[cliente]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
