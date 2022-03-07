using Affiliate.Token.Models.Config;
using log4net;
using Microsoft.Extensions.Options;
using System;
using System.Security.Cryptography;
using System.Text;

namespace Affiliate.Token.Utilities
{
    public class TokenCrypto
    {
        protected static ILog Logger = LogManager.GetLogger(typeof(TokenCrypto).Name);

        public static string ComputeHMACSHA256(string data, string key)
        {
            var keyBytes = Encoding.UTF8.GetBytes(key);
            using (var hmacSHA = new HMACSHA256(keyBytes))
            {
                var dataBytes = Encoding.UTF8.GetBytes(data);
                var hash = hmacSHA.ComputeHash(dataBytes, 0, dataBytes.Length);
                return BitConverter.ToString(hash).Replace("-", "").ToUpper();
            }
        }

        public static string EncryptAES(string text, string key, string iv)
        {
            Logger.Debug(string.Format("[Encryptor][EncryptAES] Get plain text input - {0}.", text));

            Logger.Debug(string.Format("[Encryptor][EncryptAES] Encrypt with key : \"{0}\", iv: \"{1}\".", key, iv));

            string encryptedString;

            try
            {
                RijndaelManaged rijndaelCipher = new RijndaelManaged();
                rijndaelCipher.Mode = CipherMode.CBC;
                rijndaelCipher.Padding = PaddingMode.PKCS7;
                rijndaelCipher.KeySize = 128;
                rijndaelCipher.BlockSize = 128;

                byte[] pwdBytes = Encoding.UTF8.GetBytes(key);
                byte[] keyBytes = new byte[16];
                int len = pwdBytes.Length;
                if (len > keyBytes.Length) len = keyBytes.Length;
                Array.Copy(pwdBytes, keyBytes, len);

                rijndaelCipher.Key = keyBytes;

                byte[] ivBytes1 = Encoding.UTF8.GetBytes(iv);
                byte[] keyBytes1 = new byte[16];

                int len1 = ivBytes1.Length;
                if (len1 > keyBytes1.Length) len1 = keyBytes1.Length;
                Array.Copy(ivBytes1, keyBytes1, len1);
                rijndaelCipher.IV = ivBytes1;

                ICryptoTransform transform = rijndaelCipher.CreateEncryptor();
                byte[] plainText = Encoding.UTF8.GetBytes(text);
                byte[] cipherBytes = transform.TransformFinalBlock(plainText, 0, plainText.Length);
                encryptedString = Convert.ToBase64String(cipherBytes);

            }
            catch (Exception ex)
            {
                Logger.Error(string.Format("[Encryptor][EncryptAES] ErrorMessage is \"{0}\".", ex.Message));
                throw ex;
            }

            Logger.Debug(string.Format("[Encryptor][EncryptAES] Encryption done, the output is \"{0}\".", encryptedString));

            return encryptedString;
        }

        public static string DecryptAES(string text, string key, string iv)
        {
            Logger.Debug(string.Format("[Encryptor][DecryptAES] Get encrypted text input - {0}.", text));

            Logger.Debug(string.Format("[Encryptor][DecryptAES] Decrypt with key : \"{0}\", iv: \"{1}\".", key, iv));

            string decryptedString;

            try
            {
                RijndaelManaged rijndaelCipher = new RijndaelManaged();
                rijndaelCipher.Mode = CipherMode.CBC;
                rijndaelCipher.Padding = PaddingMode.PKCS7;

                rijndaelCipher.KeySize = 128;
                rijndaelCipher.BlockSize = 128;

                byte[] encryptedData = Convert.FromBase64String(text);
                byte[] pwdBytes = Encoding.UTF8.GetBytes(key);
                byte[] keyBytes = new byte[16];

                int len = pwdBytes.Length;
                if (len > keyBytes.Length) len = keyBytes.Length;
                Array.Copy(pwdBytes, keyBytes, len);
                rijndaelCipher.Key = keyBytes;

                byte[] ivBytes1 = Encoding.UTF8.GetBytes(iv);
                byte[] keyBytes1 = new byte[16];

                int len1 = ivBytes1.Length;
                if (len1 > keyBytes1.Length) len1 = keyBytes1.Length;
                Array.Copy(ivBytes1, keyBytes1, len1);
                rijndaelCipher.IV = keyBytes1;

                ICryptoTransform transform = rijndaelCipher.CreateDecryptor();

                byte[] plainText = transform.TransformFinalBlock(encryptedData, 0, encryptedData.Length);
                decryptedString = Encoding.UTF8.GetString(plainText);
            }
            catch (Exception ex)
            {
                Logger.Error(string.Format($"[Encryptor][DecryptAES] ErrorMessage is \"{ex.Message}\"."));
                throw ex;
            }

            Logger.Debug(string.Format($"[Encryptor][DecryptAES] Decryption done, the output is \"{decryptedString}\"."));

            return decryptedString;
        }
    }
}
