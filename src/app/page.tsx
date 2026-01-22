type Props = {
  title: string;
};

const Component = ({ title }: Props) => {
  return (
    <div>
      <h2>{title}</h2>
    </div>
  );
};

export default function Home() {
  return (
    <div>
      <Component title={2} />
    </div>
  );
}
