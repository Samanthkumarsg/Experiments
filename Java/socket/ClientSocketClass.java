import java.io.*;
import java.net.*;
class ClientSocketClass{
    public static void main(String args[]) {
        
        // Defining the Streams
        DataInputStream dis = null;
        DataOutputStream dos = null;
        Socket sc = null;

        try {
            // Defining the Socket
            sc = new Socket("localhost",9999);
            dis = new DataInputStream(sc.getInputStream());
            dos = new DataOutputStream(sc.getOutputStream());

            // Getting stream
            System.out.println(dis.readUTF());
            dis.close();
        } catch (Exception e) {
            //TODO: handle exception
            System.out.println(e);
        }

    }
}