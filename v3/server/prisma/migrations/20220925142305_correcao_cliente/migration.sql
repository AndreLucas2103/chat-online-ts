BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[usuario] (
    [id] BIGINT NOT NULL IDENTITY(1,1),
    [primeiroNome] VARCHAR(63) NOT NULL,
    [nomeCompleto] VARCHAR(127) NOT NULL,
    [foto] VARCHAR(255) NOT NULL CONSTRAINT [usuario_foto_df] DEFAULT 'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y',
    [email] VARCHAR(127) NOT NULL,
    [senha] VARCHAR(511) NOT NULL,
    [administrador] BIT NOT NULL CONSTRAINT [usuario_administrador_df] DEFAULT 0,
    [situacao] TINYINT NOT NULL CONSTRAINT [usuario_situacao_df] DEFAULT 1,
    [statusChat] TINYINT NOT NULL CONSTRAINT [usuario_statusChat_df] DEFAULT 3,
    [socketId] VARCHAR(127),
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [usuario_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    CONSTRAINT [usuario_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [usuario_email_key] UNIQUE NONCLUSTERED ([email])
);

-- CreateTable
CREATE TABLE [dbo].[cliente] (
    [id] BIGINT NOT NULL IDENTITY(1,1),
    [email] VARCHAR(127) NOT NULL,
    [foto] VARCHAR(255) NOT NULL CONSTRAINT [cliente_foto_df] DEFAULT 'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y',
    [nome] VARCHAR(127) NOT NULL,
    [socketId] VARCHAR(127),
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [cliente_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    CONSTRAINT [cliente_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[chat] (
    [id] BIGINT NOT NULL IDENTITY(1,1),
    [uuid] UNIQUEIDENTIFIER NOT NULL CONSTRAINT [chat_uuid_df] DEFAULT NEWID(),
    [situacao] TINYINT NOT NULL CONSTRAINT [chat_situacao_df] DEFAULT 1,
    [dataInicio] DATETIME2 NOT NULL CONSTRAINT [chat_dataInicio_df] DEFAULT CURRENT_TIMESTAMP,
    [dataFim] DATETIME2,
    [idCliente] BIGINT,
    [idUsuarioResponsavel] BIGINT,
    [idUsuarioFila] BIGINT,
    CONSTRAINT [chat_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [chat_uuid_key] UNIQUE NONCLUSTERED ([uuid])
);

-- CreateTable
CREATE TABLE [dbo].[Mensagem] (
    [id] UNIQUEIDENTIFIER NOT NULL CONSTRAINT [Mensagem_id_df] DEFAULT NEWID(),
    [mensagem] VARCHAR(4095) NOT NULL,
    [data] DATETIME2 NOT NULL CONSTRAINT [Mensagem_data_df] DEFAULT CURRENT_TIMESTAMP,
    [idChat] BIGINT NOT NULL,
    [idUsuario] BIGINT,
    [idCliente] BIGINT,
    CONSTRAINT [Mensagem_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- AddForeignKey
ALTER TABLE [dbo].[chat] ADD CONSTRAINT [chat_idCliente_fkey] FOREIGN KEY ([idCliente]) REFERENCES [dbo].[cliente]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[chat] ADD CONSTRAINT [chat_idUsuarioResponsavel_fkey] FOREIGN KEY ([idUsuarioResponsavel]) REFERENCES [dbo].[usuario]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[chat] ADD CONSTRAINT [chat_idUsuarioFila_fkey] FOREIGN KEY ([idUsuarioFila]) REFERENCES [dbo].[usuario]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[Mensagem] ADD CONSTRAINT [Mensagem_idChat_fkey] FOREIGN KEY ([idChat]) REFERENCES [dbo].[chat]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[Mensagem] ADD CONSTRAINT [Mensagem_idUsuario_fkey] FOREIGN KEY ([idUsuario]) REFERENCES [dbo].[usuario]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[Mensagem] ADD CONSTRAINT [Mensagem_idCliente_fkey] FOREIGN KEY ([idCliente]) REFERENCES [dbo].[cliente]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
