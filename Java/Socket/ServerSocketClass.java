import java.io.*;
import java.net.*;

class ServerSocketClass{
    public static void main(String args[]) {
        System.out.println("Hey! I'm your server . .");

        // Streams
        OutputStream os = null;
        InputStream is = null;
        DataOutputStream dos = null;
        DataInputStream dis = null;

        try {
            ServerSocket ss = new ServerSocket(9999);
            Socket sc = ss.accept();
            os = sc.getOutputStream();
            dos = new DataOutputStream(os);
            is = sc.getInputStream();
            dis = new DataInputStream(is);

            // Interaction
            dos.writeUTF("Hey Client!");
            dos.flush();
            dos.close();
        } catch (Exception e) {
            //TODO: handle exception
            System.out.println(e);
        }

    }
}