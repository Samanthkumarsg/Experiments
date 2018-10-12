import java.rmi.*;

public interface PrimeCheckInt extends Remote{
    public boolean check(int a) throws RemoteException;
}