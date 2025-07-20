package com.FitnessGroupHealthClub.GymMangementSystem.service;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.nio.charset.StandardCharsets;
import java.math.BigInteger;

public class SHA256Hasher {
    public static String getSHA256Hash(String input) {
        try {
            // Get an instance of the SHA-256 MessageDigest
            MessageDigest messageDigest = MessageDigest.getInstance("SHA-256");

            // Convert the input string to bytes using UTF-8 encoding
            byte[] hash = messageDigest.digest(input.getBytes(StandardCharsets.UTF_8));

            // Convert the byte array to a hexadecimal string representation
            // BigInteger(1, hash) treats the byte array as a positive number
            // String.format("%064x", ...) formats it as a 64-character hexadecimal string,
            // padding with leading zeros if necessary
            return String.format("%064x", new BigInteger(1, hash));

        } catch (NoSuchAlgorithmException e) {
            // Handle the case where SHA-256 algorithm is not available
            e.printStackTrace();
            return null;
        }
    }
}
