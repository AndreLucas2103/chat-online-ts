BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[usuario] (
    [id] NVARCHAR(1000) NOT NULL CONSTRAINT [usuario_id_df] DEFAULT NEWID(),
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
    [id] NVARCHAR(1000) NOT NULL CONSTRAINT [cliente_id_df] DEFAULT NEWID(),
    [email] VARCHAR(127) NOT NULL,
    [foto] VARCHAR(255) NOT NULL CONSTRAINT [cliente_foto_df] DEFAULT 'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y',
    [nome] VARCHAR(127) NOT NULL,
    [createdAt] DATETIME2 NOT NULL CONSTRAINT [cliente_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [updatedAt] DATETIME2 NOT NULL,
    CONSTRAINT [cliente_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [cliente_email_key] UNIQUE NONCLUSTERED ([email])
);

-- CreateTable
CREATE TABLE [dbo].[chat] (
    [id] NVARCHAR(1000) NOT NULL CONSTRAINT [chat_id_df] DEFAULT NEWID(),
    [idguid] UNIQUEIDENTIFIER NOT NULL CONSTRAINT [chat_idguid_df] DEFAULT NEWID(),
    [situacao] TINYINT NOT NULL CONSTRAINT [chat_situacao_df] DEFAULT 1,
    [dataInicio] DATETIME2 NOT NULL CONSTRAINT [chat_dataInicio_df] DEFAULT CURRENT_TIMESTAMP,
    [dataFim] DATETIME2,
    [idCliente] NVARCHAR(1000),
    [idUsuarioResponsavel] NVARCHAR(1000),
    [idUsuarioFila] NVARCHAR(1000),
    CONSTRAINT [chat_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [chat_idguid_key] UNIQUE NONCLUSTERED ([idguid])
);

-- CreateTable
CREATE TABLE [dbo].[Mensagem] (
    [id] NVARCHAR(1000) NOT NULL CONSTRAINT [Mensagem_id_df] DEFAULT NEWID(),
    CONSTRAINT [Mensagem_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateTable
CREATE TABLE [dbo].[Teste] (
    [id] BIGINT NOT NULL CONSTRAINT [Teste_id_df] DEFAULT dbo.UNIQUENUMBERTIME(RAND()),
    [nome] NVARCHAR(1000),
    CONSTRAINT [Teste_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- AddForeignKey
ALTER TABLE [dbo].[chat] ADD CONSTRAINT [chat_idCliente_fkey] FOREIGN KEY ([idCliente]) REFERENCES [dbo].[cliente]([id]) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE [dbo].[chat] ADD CONSTRAINT [chat_idUsuarioResponsavel_fkey] FOREIGN KEY ([idUsuarioResponsavel]) REFERENCES [dbo].[usuario]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE [dbo].[chat] ADD CONSTRAINT [chat_idUsuarioFila_fkey] FOREIGN KEY ([idUsuarioFila]) REFERENCES [dbo].[usuario]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
