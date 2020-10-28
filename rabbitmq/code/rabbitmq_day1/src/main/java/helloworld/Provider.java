package helloworld;

import com.rabbitmq.client.Channel;
import com.rabbitmq.client.Connection;
import com.rabbitmq.client.ConnectionFactory;
import org.junit.Test;

import java.io.IOException;
import java.util.concurrent.TimeoutException;

public class Provider {

    private final static String QUEUE_NAME = "hello";

    //生产消息
    @Test
    public void testProviderMessage() throws IOException, TimeoutException {

        //创建连接mq的连接工厂对象
        ConnectionFactory connectionFactory = new ConnectionFactory();
        //设置连接rabbitmq主机
        connectionFactory.setHost("127.0.0.1");
        //设置端口号
        connectionFactory.setPort(5672);
        //设置连接哪个虚拟主机
        connectionFactory.setVirtualHost("/ems");
        //设置访问虚拟主机的用户名和密码
        connectionFactory.setUsername("ems");
        connectionFactory.setPassword("ems");


        //获取连接对象
        Connection connection = connectionFactory.newConnection();

        //获取连接中通道
        Channel channel = connection.createChannel();

        //通道绑定对应消息队列
        //参数1：队列名称，如果不存在就自动创建
        //参数2：durable 用来定义队列特性是否要持久化, 即重启后该队列是否存在
        //参数3：exclusive 是否独占队列，即其他连接是否能使用该队列
        //参数4：autoDelete 是否在消费完成后自动删除队列
        //参数5：额外参数
        channel.queueDeclare("hello",false,false,false,null);

        //发布消息
        //参数1：交换机名称  参数2：队列名称   参数3： 传递消息额外设置  参数4：消息的具体内容
        String message = "Hello rabbitmq!";
        channel.basicPublish("","hello",null,message.getBytes());

        //关闭通道和连接
        channel.close();
        connection.close();


    }

}
