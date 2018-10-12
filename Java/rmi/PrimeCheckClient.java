import java.rmi.*;
import java.io.*;
class PrimeCheckClient{
    public static void main(String args[]){
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        try {
            PrimeCheckInt in = (PrimeCheckInt)Naming.lookup("prime");
            System.out.print("Enter a Number : ");
            int y = Integer.parseInt(br.readLine());
            boolean value = in.check(y);
            if(value)
                System.out.println("Number is not a prime");
            else
                System.out.println("Number is a prime");
        } catch (Exception e) {
            //TODO: handle exception
        }
    }
}