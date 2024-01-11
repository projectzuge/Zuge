using Microsoft.EntityFrameworkCore;
using System.Security.Cryptography;
using Zuge.Domain.Abstractions;
using Zuge.Domain.Types.Authentication;
using Zuge.Infrastructure.Persistence;

namespace Zuge.Infrastructure.Auth;

public class AuthenticationContext(DbContextOptions<AuthenticationContext> options) : DbContext(options), IAuthUnitOfWork
{
    public Task CommitAsync(CancellationToken cancellationToken = default) =>
        SaveChangesAsync(cancellationToken);

    public IAuthRepository<T> Repository<T>() where T : class =>
        new DbSetAuthRepository<T>(Set<T>());
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        _ = modelBuilder.Entity<UserAccount>(entity =>
        {
            entity.ToTable("user_accounts");
            entity.HasIndex(e => e.Email, "user_account_email_key").IsUnique();
            entity.Property(e => e.Email).HasMaxLength(254);
            entity.Property(e => e.FirstName).HasMaxLength(100);
            entity.Property(e => e.LastName).HasMaxLength(100);
            entity.Property(e => e.PhoneNumber).HasMaxLength(20);
            entity.HasOne(e => e.UserLoginData).WithOne(d => d.UserAccount);
        });

        _ = modelBuilder.Entity<UserLoginData>(entity =>
        {
            entity.ToTable("user_login_datas");
            entity.HasKey(e => e.UserAccountId);
            entity.HasIndex(e => e.Email, "user_login_data_email_key").IsUnique();
            entity.Property(e => e.Email).HasMaxLength(254);
            entity.Property(e => e.PasswordHash).HasMaxLength(100);
            entity.Property(e => e.PasswordSalt).HasMaxLength(100);
        });

        //modelBuilder.Entity<ExternalProvider>(entity =>
        //{
        //    entity.HasKey(e => e.Id).HasName("external_provider_pkey");

        //    entity.ToTable("external_provider");

        //    entity.Property(e => e.Id).HasColumnName("id");
        //    entity.Property(e => e.ProviderName)
        //        .HasMaxLength(50)
        //        .HasColumnName("providerName");
        //    entity.Property(e => e.WsEndpoint)
        //        .HasMaxLength(200)
        //        .HasColumnName("wsEndpoint");
        //});

        //modelBuilder.Entity<GrantedPermission>(entity =>
        //{
        //    entity.HasKey(e => e.Id).HasName("granted_permission_pkey");

        //    entity.ToTable("granted_permission");

        //    entity.Property(e => e.Id).HasColumnName("id");
        //    entity.Property(e => e.PermissionId).HasColumnName("permission_id");
        //    entity.Property(e => e.RoleId).HasColumnName("role_id");

        //    entity.HasOne(d => d.Permission).WithMany(p => p.GrantedPermissions)
        //        .HasForeignKey(d => d.PermissionId)
        //        .HasConstraintName("granted_permission_permission_id_fkey");

        //    entity.HasOne(d => d.Role).WithMany(p => p.GrantedPermissions)
        //        .HasForeignKey(d => d.RoleId)
        //        .HasConstraintName("granted_permission_role_id_fkey");
        //});

        //modelBuilder.Entity<HashingAlgorithm>(entity =>
        //{
        //    entity.HasKey(e => e.Id).HasName("hashing_algorithms_pkey");

        //    entity.ToTable("hashing_algorithms");

        //    entity.Property(e => e.Id).HasColumnName("id");
        //    entity.Property(e => e.AlgorithmName)
        //        .HasMaxLength(10)
        //        .HasColumnName("algorithmName");
        //});

        //modelBuilder.Entity<Permission>(entity =>
        //{
        //    entity.HasKey(e => e.Id).HasName("permission_pkey");

        //    entity.ToTable("permission");

        //    entity.Property(e => e.Id).HasColumnName("id");
        //    entity.Property(e => e.PermissionDescription)
        //        .HasMaxLength(50)
        //        .HasColumnName("permissionDescription");
        //});

        //modelBuilder.Entity<UserAccount>(entity =>
        //{
        //    entity.HasKey(e => e.Id).HasName("user_account_pkey");

        //    entity.ToTable("user_account");

        //    entity.Property(e => e.Id).HasColumnName("id");
        //    entity.Property(e => e.FirstName)
        //        .HasMaxLength(100)
        //        .HasColumnName("firstName");
        //    entity.Property(e => e.LastName)
        //        .HasMaxLength(100)
        //        .HasColumnName("lastName");
        //    entity.Property(e => e.RegistrationTime)
        //        .HasColumnType("timestamp without time zone")
        //        .HasColumnName("registrationTime");
        //    entity.Property(e => e.RoleId).HasColumnName("role_id");

        //    entity.HasOne(d => d.Role).WithMany(p => p.UserAccounts)
        //        .HasForeignKey(d => d.RoleId)
        //        .HasConstraintName("user_account_role_id_fkey");
        //});

        //modelBuilder.Entity<UserLoginDataExternal>(entity =>
        //{
        //    entity.HasKey(e => e.Id).HasName("user_login_data_external_pkey");

        //    entity.ToTable("user_login_data_external");

        //    entity.Property(e => e.Id).HasColumnName("id");
        //    entity.Property(e => e.ExternalProviderId).HasColumnName("externalProvider_id");
        //    entity.Property(e => e.ExternalProviderToken)
        //        .HasMaxLength(100)
        //        .HasColumnName("externalProviderToken");
        //    entity.Property(e => e.UserAccountId).HasColumnName("user_account_id");

        //    entity.HasOne(d => d.ExternalProvider).WithMany(p => p.UserLoginDataExternals)
        //        .HasForeignKey(d => d.ExternalProviderId)
        //        .HasConstraintName("user_login_data_external_externalProvider_id_fkey");

        //    entity.HasOne(d => d.UserAccount).WithMany(p => p.UserLoginDataExternals)
        //        .HasForeignKey(d => d.UserAccountId)
        //        .HasConstraintName("user_login_data_external_user_account_id_fkey");
        //});

        //modelBuilder.Entity<UserLoginData>(entity =>
        //{
        //    entity.HasKey(e => e.Id).HasName("user_login_data_pkey");

        //    entity.ToTable("user_login_data");

        //    entity.HasIndex(e => e.Email, "user_login_data_email_key").IsUnique();

        //    entity.Property(e => e.Id).HasColumnName("id");
        //    entity.Property(e => e.ConfirmationToken)
        //        .HasMaxLength(100)
        //        .HasColumnName("confirmationToken");
        //    entity.Property(e => e.Email)
        //        .HasMaxLength(254)
        //        .HasColumnName("email");
        //    entity.Property(e => e.EmailValidationTime)
        //        .HasColumnType("timestamp without time zone")
        //        .HasColumnName("emailValidationTime");
        //    entity.Property(e => e.HashingAlgorithmId).HasColumnName("hashingAlgorithm_id");
        //    entity.Property(e => e.PasswordHash)
        //        .HasMaxLength(250)
        //        .HasColumnName("passwordHash");
        //    entity.Property(e => e.PasswordRecoveryToken)
        //        .HasMaxLength(100)
        //        .HasColumnName("passwordRecoveryToken");
        //    entity.Property(e => e.PasswordSalt)
        //        .HasMaxLength(100)
        //        .HasColumnName("passwordSalt");
        //    entity.Property(e => e.RecoveryTokenGenerationTime)
        //        .HasColumnType("timestamp without time zone")
        //        .HasColumnName("recoveryTokenTime");
        //    entity.Property(e => e.TokenGenerationTime)
        //        .HasColumnType("timestamp without time zone")
        //        .HasColumnName("tokenGenerationTime");
        //    entity.Property(e => e.UserAccountId).HasColumnName("user_account_id");

        //    entity.HasOne(d => d.HashingAlgorithm).WithMany(p => p.UserLoginData)
        //        .HasForeignKey(d => d.HashingAlgorithmId)
        //        .HasConstraintName("user_login_data_hashingAlgorithm_id_fkey");

        //    entity.HasOne(d => d.UserAccount).WithOne(p => p.UserLoginData)
        //        .HasConstraintName("user_login_data_user_account_id_fkey");
        //});

        //modelBuilder.Entity<UserRole>(entity =>
        //{
        //    entity.HasKey(e => e.Id).HasName("user_role_pkey");

        //    entity.ToTable("user_role");

        //    entity.Property(e => e.Id).HasColumnName("id");
        //    entity.Property(e => e.RoleDescription)
        //        .HasMaxLength(20)
        //        .HasColumnName("roleDescription");
        //});
    }
}
